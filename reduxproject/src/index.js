import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './feautures/users/usersSlice';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { fetchPosts } from './feautures/posts/postsSlice';
store.dispatch(fetchUsers())//We can directly populate the autors while launching the app itself...
store.dispatch(fetchPosts())//index.js is the first thing to be loaded while launching the app it is better to dispatch the posts as well while launching to avoid reload issues
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
    {/* //here store is provided in the app after creating store for global state management... */}
    <Router>
      <Routes>
        <Route path="/*"element={<App />}/>
        </Routes>
    </Router>
    </Provider>
  </React.StrictMode>
);
