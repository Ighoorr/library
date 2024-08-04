import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';  // Import the BookForm component
//import AuthorList from './components/AuthorList';
//import AuthorForm from './components/AuthorForm';

const App = () => (
    <Router>
        <Switch>
            <Route path="/books" component={BookList} />
            <Route path="/add-book" component={BookForm} />
            <Route path="/edit-book/:id" component={BookForm} />  // Route for editing a book
            
        </Switch>
    </Router>
);/*
<Route path="/authors" component={AuthorList} />
            <Route path="/add-author" component={AuthorForm} />
            <Route path="/edit-author/:id" component={AuthorForm} />  // Route for editing an author*/
export default App;
