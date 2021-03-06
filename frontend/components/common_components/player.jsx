import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { setCurrentSong, playSong, pauseSong } from "../../actions/current_song_actions";
import { createQueue, replaceQueue } from "../../actions/queue_actions";
import { songsByCreationDate } from "../../util/song_api_util";
import Waveform from "../common_components/waveform";
import SocialElements from "../common_components/social_elements";
import CommentBox from "../common_components/comment_box";

const msp = (state) => {
    return ({
        currentSong: state.ui.currentSong,
        queue: state.ui.queue,
    })
}

const mdp = (dispatch) => {
    return ({
        createQueue: (queue) => dispatch(createQueue(queue)),
        replaceQueue: (queue) => dispatch(replaceQueue(queue)),
        setCurrentSong: (song) => dispatch(setCurrentSong(song)),
        playSong: () => dispatch(playSong()),
        pauseSong: () => dispatch(pauseSong()),
    })
}

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.noneStyle = {
            display: "none",
        }
        this.klass = this.props.klass === "banner-player" ? "none" : this.props.klass;
    }

    togglePlayPause() {
        if (!this.props.queue) {
            this.props.createQueue(songsByCreationDate(this.props.songs));
        } else if (this.props.queue && !this.props.queue.unshuffled.map(song => song.id).includes(this.props.songId)) {
            this.props.replaceQueue(songsByCreationDate(this.props.songs));
        }
        if (!this.props.currentSong.song || this.props.songId !== this.props.currentSong.song.id) {
            this.props.setCurrentSong(this.props.song);
            this.props.playSong();
        } else if (this.props.songId === this.props.currentSong.song.id) {
            this.props.currentSong.playing ? this.props.pauseSong() : this.props.playSong() ;
        }
    }

    renderPlayPauseSign() {
        if (this.props.currentSong.song && this.props.songId === this.props.currentSong.song.id && this.props.currentSong.playing) {
            return (
                <img src={window.pause_button} className="pause-sign" onClick={() => this.togglePlayPause()} />
            );
        } else {
            return (
                <img src={window.play_button} className="play-sign" onClick={() => this.togglePlayPause()} />       
            );
        }
    }

    renderUploadTime(date) {
        if (!date) return "0 second ago";
        const itemLife = Math.abs(new Date() - new Date(date)) / 1000;
        if (itemLife < 60) {
            const unit = Math.floor(itemLife) > 1 ? "seconds" : "second";
            return `${Math.floor(itemLife)} ${unit} ago`;
        } else if (itemLife < 3600) {
            const unit = Math.floor(itemLife / 60) > 1 ? "minutes" : "minute";
            return `${Math.floor(itemLife / 60)} ${unit} ago`;
        } else if (itemLife < 86400) {
            const unit = Math.floor(itemLife / 3600) > 1 ? "hours" : "hour";
            return `${Math.floor(itemLife / 3600)} ${unit} ago`;
        } else if (itemLife < 2592000) {
            const unit = Math.floor(itemLife / 86400) > 1 ? "days" : "day";
            return `${Math.floor(itemLife / 86400)} ${unit} ago`;
        } else if (itemLife < 31104000) {
            const unit = Math.floor(itemLife / 2592000) > 1 ? "months" : "month";
            return `${Math.floor(itemLife / 2592000)} ${unit} ago`;
        } else {
            const unit = Math.floor(itemLife / 31104000) > 1 ? "years" : "year";
            return `${Math.floor(itemLife / 31104000)} ${unit} ago`;
        }
    }

    renderSongName() {
        if (this.props.klass === "banner-player") {
            return <h2 className="title">{this.props.song.title}</h2>;
        } else {
            return <Link to={`/songs/${this.props.song.id}`} className="title">{this.props.song.title}</Link>;
        }
    }

    render() {
        return (
            <div className={this.props.klass === "banner-player" ? "banner-player-container" : "item-player-container"}>
                <img src={this.props.song.imageURL ? this.props.song.imageURL : window.song_dp} className="img-left" style={(this.props.klass === "banner-player") ? this.noneStyle : {}}></img>
                <div className={this.props.klass === "banner-player" ? "banner-player" : "item-player"}>
                    <div className="top">
                        <div className="left">
                            {this.renderPlayPauseSign()}
                            <div className="song-info">
                                <Link to={`/users/${this.props.song.artist.id}`} className="artist">{this.props.song.artist.username}</Link>
                                {this.renderSongName()}
                            </div>
                        </div>
                        <div className="right">
                            <h4 className="upload-time" style={(this.props.klass === "item-player") ? this.noneStyle : {}}>{this.renderUploadTime(this.props.song.createdAt)}</h4>
                            <h4 className="genre">#{this.props.song.genre}</h4>
                        </div>
                    </div>
                    <div className="waveform-container">
                        <Waveform 
                        klass={this.props.klass}
                        id={this.props.songId}
                        song={this.props.song}
                        songId={this.props.songId}
                        />
                    </div>
                    <CommentBox klass={this.props.klass} songId={this.props.songId} /> 
                    <SocialElements
                        klass={this.klass}
                        song={this.props.song}
                        songId={this.props.songId}
                        style={(this.props.klass === "banner-player") ? this.noneStyle : {}}
                    />
                </div>
                <img src={this.props.song.imageURL ? this.props.song.imageURL : window.user_dp} className="img-right"  style={(this.props.klass === "item-player") ? this.noneStyle : {}}></img>
            </div>  
        );
    }
}

export default withRouter(connect(msp, mdp)(Player));