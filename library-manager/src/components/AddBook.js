import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:44393/api/Authors')
            .then(response => setAuthors(response.data))
            .catch(error => console.error('There was an error fetching the authors!', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBook = {
            title,
            genre,
            authorId: parseInt(authorId) 
        };

        axios.post('https://localhost:44393/api/Books', newBook)
            .then(response => {
                console.log('Book added successfully:', response.data);
                // Clear the form
                setTitle('');
                setGenre('');
                setAuthorId('');
            })
            .catch(error => console.error('There was an error adding the book!', error));
    };

    return (
        <div className="container">
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Genre</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <select
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="">Select an Author</option>
                        {authors.map(author => (
                            <option key={author.authorId} value={author.authorId}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
