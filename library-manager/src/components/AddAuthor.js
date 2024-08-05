import React, { useState } from 'react';
import axios from 'axios';

const AddAuthor = () => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAuthor = { name };

        axios.post('https://localhost:44393/api/Authors', newAuthor)
            .then(response => {
                console.log('Author added successfully:', response.data);
                setName('');  
            })
            .catch(error => console.error('There was an error adding the author!', error));
    };

    return (
        <div className="container">
            <h2>Add New Author</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Author</button>
            </form>
        </div>
    );
};

export default AddAuthor;
