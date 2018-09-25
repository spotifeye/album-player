import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandArrowsAlt, faVolumeUp, faDesktop, faSlidersH, faPauseCircle,
         faRandom, faStepBackward, faPlayCircle, faStepForward, faRedo} from '@fortawesome/free-solid-svg-icons';
import ply from '../css_components/Player.css';


class Player extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      album: 0,
      song: 0,
      playing: false,
      playValue: 0,
      timeValue: "0:00"
    }
  }

  componentWillReceiveProps(newProps) {
    this.clearAllIntervals();
    if (this.state.album === newProps.albumPlaying - 1 && this.state.song === newProps.songPlaying - 1) {
      this.setState({
        playing: true
      }, () => {
        this.clearAllIntervals();
        setInterval(() => {
          this.setState({
            playValue: this.state.playValue + 1,
            timeValue: this.handlePlayedTime(this.state.playValue + 1)
          })
        }, 1000)
      })
    } else if (newProps.albumPlaying !== 0) {
      this.setState({
        album: newProps.albumPlaying - 1,
        song: newProps.songPlaying - 1,
        playing: true,
        playValue: 0,
        timeValue: "0:00"
      }, () => {
        setInterval(() => {
          if (this.state.playValue >= this.props.albums[this.state.album].songs[this.state.song].length) {
            return this.handleNextClick();
          }
          this.setState({
            playValue: this.state.playValue + 1,
            timeValue: this.handlePlayedTime(this.state.playValue + 1)
          })
        }, 1000)
      })
    } else {
      this.setState({
        playing: false
      }, () => this.clearAllIntervals())
    }
  }

  handlePlayClick() {
    if (!this.state.playing) {
      this.props.updateAlbumSongPlaying(this.state.album+1, this.state.song+1);
      this.setState({
        playing: true
      }, () => {
        setInterval(() => {
          if (this.state.playValue >= this.props.albums[this.state.album].songs[this.state.song].length) {
            return this.handleNextClick();
          }
          this.setState({
            playValue: this.state.playValue + 1,
            timeValue: this.handlePlayedTime(this.state.playValue + 1)
          })
        }, 1000)
      })
    } else {
      this.props.updateAlbumSongPlaying(0, 0);
      this.setState({
        playing: false
      }, () => this.clearAllIntervals())
    }
  }

  handlePlayedTime(secondsTotal) {
    var minutes = Math.floor(secondsTotal / 60);
    var seconds = secondsTotal - minutes * 60;
    function str_pad_left(string,pad,length) {
      return (new Array(length+1).join(pad)+string).slice(-length);
    }
    var finalTime = str_pad_left(minutes,'0',1)+':'+str_pad_left(seconds,'0',2);
    return finalTime;
  }

  handleNextClick() {
    if (this.props.albums[this.state.album].songs.length <= this.state.song + 1) {
      if (this.props.albums.length === this.state.album + 1) {
        this.props.updateAlbumSongPlaying(1, 1);
      } else {
        this.props.updateAlbumSongPlaying(this.state.album+2, 1);
      }
    } else {
      this.props.updateAlbumSongPlaying(this.state.album+1, this.state.song+2);
    }
  }

  handlePreviousClick() {
    if (this.state.song - 1 < 0) {
      if (this.state.album === 0) {
        this.props.updateAlbumSongPlaying(this.props.albums.length, this.props.albums[this.props.albums.length-1].songs.length);
      } else {
        this.props.updateAlbumSongPlaying(this.state.album, this.props.albums[this.state.album-1].songs.length);
      }
    } else {
      this.props.updateAlbumSongPlaying(this.state.album+1, this.state.song);
    }
  }

  handleRandomSongClick() {
    var alb = Math.floor(Math.random() * this.props.albums.length);
    var sng = Math.floor(Math.random() * this.props.albums[alb].songs.length);
    this.props.updateAlbumSongPlaying(alb+1, sng+1);
  } 

  handleRepeatSongClick() {
    this.setState({
      playValue: 0,
      timeValue: "0:00"
    }, () => {
      this.clearAllIntervals();
      setInterval(() => {
        if (this.state.playValue >= this.props.albums[this.state.album].songs[this.state.song].length) {
          return this.handleNextClick();
        }
        this.setState({
          playValue: this.state.playValue + 1,
          timeValue: this.handlePlayedTime(this.state.playValue + 1)
        })
      }, 1000)
    })
  }

  clearAllIntervals() {
    for (var i = 0; i < 1000; i++) {
      window.clearInterval(i);
    }
  }

  render() {
    return (
      <div>
        <Row>

          <Col xs={3} >
            <div className={ply.playerleft}>
              <p style={{float: "left", margin: "15"}}>
                <div>
                  <img src={this.props.albums[this.state.album].albumImage} width="20px" height="20px"  border="1px" className={ply.playerimage}/>
                </div>
              </p>
              <p style={{margin: "0"}}>
                <br/>
                <div><span id={ply.playersongname}>{this.props.albums[this.state.album].songs[this.state.song].songName}</span></div>
                <div><span id={ply.playerartistname}>{this.props.artist}</span></div>
              </p>
            </div>
          </Col>

          <Col xs={6} >
            <div className={ply.playermiddle}>
              <div id={ply.playermiddlebutton} onClick={this.handleRandomSongClick.bind(this)}><FontAwesomeIcon icon={faRandom} size="sm"/></div>
              <div id={ply.playermiddlebutton} onClick={this.handlePreviousClick.bind(this)}><FontAwesomeIcon icon={faStepBackward} size="sm"/></div>
              { (this.state.playing && this.props.albumPlaying !== 0) ?
                <div id={ply.playermiddlebuttonplay} onClick={this.handlePlayClick.bind(this)}>
                  <FontAwesomeIcon icon={faPauseCircle} size="lg"/>
                </div>
                :
                <div id={ply.playermiddlebuttonplay} onClick={this.handlePlayClick.bind(this)}>
                  <FontAwesomeIcon icon={faPlayCircle} size="lg"/>
                </div>
              }
              <div id={ply.playermiddlebutton} onClick={this.handleNextClick.bind(this)}><FontAwesomeIcon icon={faStepForward} size="sm"/></div>
              <div id={ply.playermiddlebutton} onClick={this.handleRepeatSongClick.bind(this)}><FontAwesomeIcon icon={faRedo} size="sm"/></div>
            </div>
            <div className={ply.playermiddlebottom}>
              <div id={ply.playermiddlebottomtextleft}>{this.state.timeValue}</div>
              <div id={ply.playermiddlebottomelements}><input className={ply.songslider} type="range" min="0" max={this.props.albums[this.state.album].songs[this.state.song].length} value={this.state.playValue}/></div>
              {this.props.albums[this.state.album].songs[this.state.song].length%60 < 10 ? 
                <div id={ply.playermiddlebottomtextright}>{Math.floor(this.props.albums[this.state.album].songs[this.state.song].length/60)}:0{this.props.albums[this.state.album].songs[this.state.song].length%60}</div>
                :
                <div id={ply.playermiddlebottomtextright}>{Math.floor(this.props.albums[this.state.album].songs[this.state.song].length/60)}:{this.props.albums[this.state.album].songs[this.state.song].length%60}</div>
              }
              
            </div>
          </Col>

          <Col xs={3} >
            <div className={ply.playerright}>
              <div id={ply.playerrightbutton}><FontAwesomeIcon icon={faExpandArrowsAlt} size="sm"/></div>
              <div id={ply.playerrightbutton}><input className={ply.volumeslider} type="range" min="1" max="100" /></div>
              <div id={ply.playerrightbutton}><FontAwesomeIcon icon={faVolumeUp} size="sm"/></div>
              <div id={ply.playerrightbutton}><FontAwesomeIcon icon={faDesktop} size="sm"/></div>
              <div id={ply.playerrightbutton}><FontAwesomeIcon icon={faSlidersH} size="sm"/></div>
            </div>
          </Col>

        </Row>
      </div>
    )
  }
}

export default Player;