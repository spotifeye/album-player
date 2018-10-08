import React from 'react';
import Album from './Album.jsx';
import Player from './Player.jsx';
import appCss from '../css_components/App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: {},
      artistID: 0,
      artistName: '',
      albums: [{ albumImage: '', songs: [{ songName: '' }] }],
      albumPlayingID: 0,
      songPlayingID: 0
    };
    var artistId = window.location.pathname.split('/').slice(-2)[0] || Math.floor(Math.random() * 2000000) + 10000000;
    this.getAllArtists(artistId);
  }

  componentDidMount() {
    var artistId = window.location.pathname.split('/').slice(-2)[0] || Math.floor(Math.random() * 2000000) + 10000000;
    this.getAllArtists(artistId);
  }

  getAllArtists(artistId) {
    axios.get(`/api/v1/artists/${artistId}/albums`).then(({ data }) => {
      console.log(data);
      this.setState({
        artist: data,
        artistID: artistId,
        artistName: data.artistName,
        albums: data.albums
      });
    });
  }

  updateAlbumSongPlaying(albumID, songID) {
    this.setState({
      albumPlayingID: albumID,
      songPlayingID: songID
    });
  }

  buildAlbums() {
    var albums = [];
    for (var i = 0; i < this.state.albums.length; i++) {
      albums.push(
        <div>
          <Album album={this.state.albums[i]} id={i + 1} update={this.updateAlbumSongPlaying.bind(this)} albumPlaying={this.state.albumPlayingID} songPlayingID={this.state.songPlayingID} />
        </div>
      );
    }
    return albums;
  }

  render() {
    return (
      <div>
        <div className={appCss.albumsModule}>
          <h3 id={appCss.AppAlbumTitle}>Albums</h3>
          <hr id={appCss.horizLine} />
          <div>{this.buildAlbums()}</div>
        </div>
        <div className={appCss.playerModule}>
          <Player artist={this.state.artistName} albums={this.state.albums} albumPlaying={this.state.albumPlayingID} songPlaying={this.state.songPlayingID} updateAlbumSongPlaying={this.updateAlbumSongPlaying.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
