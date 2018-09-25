import React from 'react';
import ReactDOM from 'react-dom';
import AlbumApp from './components/App.jsx';

ReactDOM.render(<AlbumApp />, document.getElementById('albumApp'));

window.AlbumApp = AlbumApp;