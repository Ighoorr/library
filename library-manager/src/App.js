import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import AddAuthor from './components/AddAuthor';
import AddBook from './components/AddBook';


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<BookList />} />
                     <Route path="/add-book" element={<AddBook />} />

                    <Route path="/add-author" element={<AddAuthor />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
