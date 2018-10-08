import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong } from "../../../actions/current_song_actions";
import { latestTwelve } from "../../../util/song_api_util";

const msp = (state) => {
    return {
        byOrder: latestTwelve(state.entities.songs),
        shuffled: 
        currentSong: state.ui.currentSong,
    }
}

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
        setCurrentSong: (song) => dispatch(setCurrentSong(song)),
        playSong: (song) => dispatch(playSong(song)),
        pauseSong: (song) => dispatch(pauseSong(song)),
    });
}

class PlayerBar extends React.Component {
    constructor(props) {
        super(props);
        this.repeat = ["none", "all", "single"];
        this.state = {
            playing: this.props.currentSong.playing,
            elapsed: this.props.currentSong.elapsed,
            muted: true,
            volume: 0.60,
            shuffle: false,
            loop: this.repeat[0]
        };
        this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.ref = this.ref.bind(this);
        this.handleShuffle = this.handleShuffle.bind(this);
        this.handleLoop = this.handleLoop.bind(this);
    }

    componentWillMount() {
        this.props.fetchSongs();
    }
    

    handlePause(song) {
        this.props.pauseSong(song);
    }

    handlePlay(song) {
        this.props.playSong(song);
    }

    handlePrevious(currentSong) {
        const songsIdx = this.props.songs.map((song, i) => i);
        debugger
        let currentSongIdx = songsIdx.find((idx) => {
           const song = this.props.songs[idx];
           return song.id === currentSong.id
        });
        const nextSongIdx = (currentSongIdx - 1) < 0 ? this.props.songs.length - 1 : currentSongIdx - 1;
        const nextSong = this.props.songs[nextSongIdx];
        debugger
        this.props.setCurrentSong(nextSong);
        this.props.playSong(nextSong);
    }

    handleNext(currentSong) {
        const songsIdx = this.props.songs.map((song, i) => i);
        debugger
        let currentSongIdx = songsIdx.find((idx) => {
           const song = this.props.songs[idx];
           return song.id === currentSong.id
        });
        const nextSongIdx = (currentSongIdx + 1) === this.props.songs.length ? 0 : currentSongIdx + 1;
        const nextSong = this.props.songs[nextSongIdx];
        debugger
        this.props.setCurrentSong(nextSong);
        this.props.playSong(nextSong);
    }

    handleShuffle() {
        debugger
        for (let i = this.props.songs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // debugger
            [this.props.songs[i], this.props.songs[j]] = [this.props.songs[j], this.props.songs[i]];
        }
        debugger
        return this.props.songs;
    }
    
    handleLoop() {
        this.repeat.push(this.repeat.shift());
    }

    ref(player) {
        this.player = player;
      }
     
    renderTime(elapsedTime) {
      while (elapsedTime)
    }
//   getDuration(src) {
//     let audio = new Audio(src);
//     const audioLength = audio.getDuration();
//     return audioLength;
//   }   

//   getPlayed(src) {
    
//   }

  renderPlayPauseButton() {
      if (this.props.currentSong.playing) {
          return (
            <img src={window.play_bar_pause} className="player-control" onClick={() => this.handlePause(this.props.currentSong.song)}></img>
          );
      } else {
          return (
            <img src={window.play_bar_play} className="player-control" onClick={() => this.handlePlay(this.props.currentSong.song)}></img>
          );
      }
  }

  render() {
    debugger
    if (this.props.currentSong.song) {
        debugger
        return (
        <div className="player-bar-container">
            <div className="player-bar">
                <ReactPlayer 
                    url={this.props.currentSong.audioURL}
                    ref={this.ref}
                    playing={this.props.currentSong.playing}
                    volume={this.state.volume}
                    width="0px"
                    height="0px"
                    onProgress={this.onProgress}
                    onDuration={this.onDuration}
                    onEnded={this.onEnded}
                />
                <div className="player-controls-container">
                    <img src={window.play_bar_previous} className="player-control" onClick={() => this.handlePrevious(this.props.currentSong.song)}></img>
                    {this.renderPlayPauseButton()}
                    <img src={window.play_bar_next} className="player-control" onClick={() => this.handleNext(this.props.currentSong.song)}></img>
                    <img src={window.play_bar_shuffle} className="player-control" onClick={() => this.handleShuffle()}></img>
                    <img src={window.play_bar_loop} className="player-control" onClick={() => this.handleLoop()}></img>
                </div>
                <div className="song-progress-tracker-container">
                    <div className="song-progress-container">
                        {this.renderTime(Math.round(this.state.elapsed * this.ref))}
                    </div>
                    <div className="song-progress-slider">
                    </div>
                </div>
                <div className="song-length-container">
                    {this.formatTime(Math.round(this.state.lengthTrack))}
                </div>
            </div>
                
        </div>
        );
    } else {
        return (
            <div></div>
        );
    }
  }
}

export default withRouter(connect(msp, mdp)(PlayerBar));


