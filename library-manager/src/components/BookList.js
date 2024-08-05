import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditBookModal from './EditBookModal';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const [filterTitle, setFilterTitle] = useState('');
    const [filterAuthor, setFilterAuthor] = useState('');

    useEffect(() => {
        fetchBooks(filterTitle, filterAuthor);
        fetchAuthors();
    }, [filterTitle, filterAuthor]);

    const fetchBooks = (title = '', authorName = '') => {
        let url = 'https://localhost:44393/api/Books';
        
        if (title || authorName) {
            url = 'https://localhost:44393/api/Books/filter';
        }
    
        axios.get(url, {
            params: { title, authorName }
        })
        .then(response => {
            console.log('API response data:', response.data); 
            setBooks(response.data);
        })
        .catch(error => console.error('There was an error fetching the books!', error));
    };

    const fetchAuthors = () => {
        axios.get('https://localhost:44393/api/Authors')
            .then(response => setAuthors(response.data))
            .catch(error => console.error('There was an error fetching the authors!', error));
    };

    const deleteBook = (id) => {
        axios.delete(`https://localhost:44393/api/Books/${id}`)
            .then(() => {
                setBooks(books.filter(book => book.bookId !== id));
            })
            .catch(error => console.error('There was an error deleting the book!', error));
    };

    const deleteAuthor = (id) => {
        axios.delete(`https://localhost:44393/api/Authors/${id}`)
            .then(() => {
                fetchAuthors();
                fetchBooks(); 
            })
            .catch(error => console.error('There was an error deleting the author and their books!', error));
    };

    const exportBooks = () => {
        axios.get('https://localhost:44393/api/Books/export', { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'books.csv');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => console.error('There was an error exporting the books!', error));
    };

    const handleEditClick = (bookId) => {
        setSelectedBookId(bookId);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    const handleBookUpdated = () => {
        fetchBooks(filterTitle, filterAuthor);
    };

    return (
        <div className="container">
           <h2>Books</h2>
<div class="row mb-3">
    <div class="col-md-6">
        <input
            type="text"
            placeholder="Filter by title"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            class="form-control"
        />
    </div>
    <div class="col-md-6">
        <input
            type="text"
            placeholder="Filter by author"
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            class="form-control"
        />
    </div>
</div>

            <Link to="/add-book" className="btn btn-primary mb-3">Add Book</Link>
            <Link to="/add-author" className="btn btn-secondary mb-3 ml-3">Add Author</Link>
            <button onClick={exportBooks} className="btn btn-secondary mb-3 ml-3">Export Books</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.bookId}>
                            <td>{book.title}</td>
                            <td>{book.genre}</td>
                            <td>{book.author ? book.author.name : 'Unknown'}</td>
                            <td>
                                <button 
                                    onClick={() => handleEditClick(book.bookId)} 
                                    className="btn btn-warning btn-sm mr-2">
                                    Edit
                                </button>
                                <button 
                                    onClick={() => deleteBook(book.bookId)} 
                                    className="btn btn-danger btn-sm">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Authors</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map(author => (
                        <tr key={author.authorId}>
                            <td>{author.name}</td>
                            <td>
                                <button 
                                    onClick={() => deleteAuthor(author.authorId)} 
                                    className="btn btn-danger btn-sm">
                                    Delete Author and Books
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <EditBookModal
                show={showEditModal}
                handleClose={handleCloseModal}
                bookId={selectedBookId}
                onBookUpdated={handleBookUpdated}
            />
        </div>
    );
};

export default BookList;
