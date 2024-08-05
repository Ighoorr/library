import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditBookModal = ({ show, handleClose, bookId, onBookUpdated }) => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        if (bookId) {
            axios.get(`https://localhost:44393/api/Books/${bookId}`)
                .then(response => {
                    const book = response.data;
                    setTitle(book.title);
                    setGenre(book.genre);
                    setAuthorId(book.authorId.toString());
                })
                .catch(error => console.error('There was an error fetching the book!', error));
        }

        axios.get('https://localhost:44393/api/Authors')
            .then(response => setAuthors(response.data))
            .catch(error => console.error('There was an error fetching the authors!', error));
    }, [bookId]);

    const handleSave = () => {
        const updatedBook = {bookId, title, genre, authorId: parseInt(authorId) };
        
        axios.put(`https://localhost:44393/api/Books/${bookId}`, updatedBook)
            .then(response => {
                onBookUpdated();
                handleClose();
            })
            .catch(error => console.error('There was an error updating the book!', error));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            as="select"
                            value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)}
                        >
                            <option value="">Select an Author</option>
                            {authors.map(author => (
                                <option key={author.authorId} value={author.authorId}>
                                    {author.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditBookModal;
