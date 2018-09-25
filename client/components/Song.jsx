import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerEmpty, faThermometerQuarter, faThermometerHalf, faThermometerThreeQuarters, 
         faThermometerFull, faPlayCircle, faPauseCircle, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import sngCss from '../css_components/Song.css';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idElement: this.props.id,
      playing: false,
      inLibrary: this.props.addedToLibrary
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      inLibrary: nextProps.addedToLibrary
    });
    if ( nextProps.originalAlbum !== nextProps.albumPlaying && nextProps.albumPlaying !== 0) {
      this.setState ({
        idElement: this.props.id,
        playing: false
      });
    } else if (nextProps.songPlaying !== this.props.id && nextProps.songPlaying !== 0) {
      this.setState ({
        idElement: this.props.id,
        playing: false
      });
    } else if (nextProps.songPlaying === this.props.id) {
      this.setState ({
        idElement: <FontAwesomeIcon icon={faPauseCircle} size="lg"/>,
        playing: true
      });
    } else if (this.state.playing === true) {
      this.setState ({
        idElement: <FontAwesomeIcon icon={faPlayCircle} size="lg"/>,
        playing: false
      });
    } else {
      this.setState ({
        idElement: this.props.id,
        playing: false
      });
    }
  }

  popularity() {
    if (this.props.song.popularity < 2) {
      return(
        <td className={sngCss.mainTableDest}>
          <div className={sngCss.dropdown}>
            <FontAwesomeIcon icon={faThermometerEmpty} size="lg"/>
            <div className={sngCss.dropdowncontent}>
              {this.props.song.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} plays
            </div>
          </div>
        </td>
      )
    } else if (this.props.song.popularity < 4) {
      return(
        <td className={sngCss.mainTableDest}>
          <div className={sngCss.dropdown}>
            <FontAwesomeIcon icon={faThermometerQuarter} size="lg"/>
            <div className={sngCss.dropdowncontent}>
              {this.props.song.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} plays
            </div>
          </div>
        </td>
      )
    } else if (this.props.song.popularity === 4) {
      return(
        <td className={sngCss.mainTableDest}>
          <div className={sngCss.dropdown}>
            <FontAwesomeIcon icon={faThermometerHalf} size="lg"/>
            <div className={sngCss.dropdowncontent}>
              {this.props.song.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} plays
            </div>
          </div>
        </td>
      )
    } else if (this.props.song.popularity < 7) {
      return(
        <td className={sngCss.mainTableDest}>
          <div className={sngCss.dropdown}>
            <FontAwesomeIcon icon={faThermometerThreeQuarters} size="lg"/>
            <div className={sngCss.dropdowncontent}>
              {this.props.song.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} plays
            </div>
          </div>
        </td>
      )
    } else {
      return(
        <td className={sngCss.mainTableDest}>
          <div className={sngCss.dropdown}>
            <FontAwesomeIcon icon={faThermometerFull} size="lg"/>
            <div className={sngCss.dropdowncontent}>
              {this.props.song.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} plays
            </div>
          </div>
        </td>
      )
    }
  }

  handleMouseOver() {
    if (!this.state.playing) {
      this.setState({
        idElement: <FontAwesomeIcon icon={faPlayCircle} size="lg"/>
      })
    }
  }

  handleMouseOut() {
    if (!this.state.playing) {
      this.setState({
        idElement: this.props.id
      })
    }
  }

  handlePlayClick() {
    if (!this.state.playing) {
      this.setState({
        idElement: <FontAwesomeIcon icon={faPauseCircle} size="lg"/>,
        playing: true
      }, () => {
        this.props.updateID(this.props.id);
        this.forceUpdate();
      })
    } else {
      this.setState({
        idElement: <FontAwesomeIcon icon={faPlayCircle} size="lg"/>,
        playing: false
      }, () => {
        this.props.updateID(0)
      })
    }
  }

  inLibraryCheck() {
    if (this.state.inLibrary) {
      return <td className={sngCss.mainTableDest} id={sngCss.plus} onClick={this.handleChangeInLibraryClick.bind(this)}><FontAwesomeIcon icon={faCheck} size="sm"/></td>;
    } else {
      return <td className={sngCss.mainTableDest} id={sngCss.plus} onClick={this.handleChangeInLibraryClick.bind(this)}><FontAwesomeIcon icon={faPlus} size="sm"/></td>;
    }
  }

  handleChangeInLibraryClick() {
    var newStateInLibrary = !this.state.inLibrary;
    this.setState({
      inLibrary: newStateInLibrary
    }, () => this.props.handleLibraryClick(this.props.id, newStateInLibrary))
  }

  coloredTitle() {
    var results = [];
    if (this.state.playing) {
      results.push(<td className={sngCss.mainTableDest} id={sngCss.songname} onClick={this.handlePlayClick.bind(this)} style={{color: 'rgb(29,185,84)'}}>{this.props.song.songName}</td>);
      if (this.props.song.length%60 < 10) {
        results.push(<td className={sngCss.mainTableDest} onClick={this.handlePlayClick.bind(this)} style={{color: 'rgb(29,185,84)'}}>{Math.floor(this.props.song.length/60)}:0{this.props.song.length%60}</td>);
      } else {
        results.push(<td className={sngCss.mainTableDest} onClick={this.handlePlayClick.bind(this)} style={{color: 'rgb(29,185,84)'}}>{Math.floor(this.props.song.length/60)}:{this.props.song.length%60}</td>);
      }
      return results;
    } else {
      results.push(<td className={sngCss.mainTableDest} id={sngCss.songname} onClick={this.handlePlayClick.bind(this)}>{this.props.song.songName}</td>);
      if (this.props.song.length%60 < 10) {
        results.push(<td className={sngCss.mainTableDest} onClick={this.handlePlayClick.bind(this)}>{Math.floor(this.props.song.length/60)}:0{this.props.song.length%60}</td>);
      } else {
        results.push(<td className={sngCss.mainTableDest} onClick={this.handlePlayClick.bind(this)}>{Math.floor(this.props.song.length/60)}:{this.props.song.length%60}</td>);
      }
      return results;
    }
  }

  render() {
    return (
      <tr className={sngCss.mainTableRow} id={sngCss.hoverelements} onMouseOver={this.handleMouseOver.bind(this)} 
                              onMouseOut={this.handleMouseOut.bind(this)}>
        <td className={sngCss.mainTableDest} onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>{this.state.idElement}</td>
        {this.inLibraryCheck()}
        {this.coloredTitle()}
        {this.popularity()}
      </tr>
    )
  }
}

export default Song;