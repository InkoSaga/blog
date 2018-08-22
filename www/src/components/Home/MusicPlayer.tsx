import * as React from 'react';
import { connect } from 'react-redux';
import * as store from '../../store';
import {
    Theme, withStyles, WithStyles,
    Button,
    MenuItem,
    Typography
} from '@material-ui/core';

import MusicOnIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import createPlayer from 'web-audio-player';

const mapReducerToStore = name => (state = {
    currentTrack: '',
    isPlaying: false
}, action) => {
    switch (action.type) {
        case `${name}-LOAD_TRACK`:
            return { ...state, currentTrack: action.payload };
        case `${name}-PLAY`:
            return { ...state, isPlaying: action.payload };
        default:
            return state;
    }
};

const mapStateToProps = name => state => ({
    currentTrack: state[name].currentTrack,
    isPlaying: state[name].isPlaying
});

const mapDispatchToProps = name => dispatch => ({
    loadTrack: (url: string) => dispatch({ type: `${name}-LOAD_TRACK`, payload: url }),
    play: (resume: boolean) => dispatch({ type: `${name}-PLAY`, payload: resume })
});

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonPanel: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        minWidth: 0,
        width: '60px',
        height: '48px',
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        '&:hover': {
            background: theme.palette.action.hover
        }
    }
});

const newPlayer = (track: string) => {
    const player = createPlayer(track, { loop: true });
    player.on('load', () => {
        player.node.connect(player.context.destination);
    });
    return player;
};

export class Component extends React.Component<WithStyles<keyof ReturnType<typeof styles>> & ReturnType<ReturnType<typeof mapStateToProps>> & ReturnType<ReturnType<typeof mapDispatchToProps>>> {

    player: any;

    togglePlay = () => {
        if (this.props.isPlaying) {
            this.props.play(false);
        } else {
            if (this.props.currentTrack === '') {
                this.props.loadTrack('/resources/background-music.mp3');
            }
            this.props.play(true);
        }
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.stop();
            this.props.play(false);
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.currentTrack !== this.props.currentTrack) {
            if (this.player) {
                this.player.stop();
            }
            this.player = newPlayer(nextProps.currentTrack);
        }
        if (nextProps.isPlaying !== this.props.isPlaying) {
            if (nextProps.isPlaying) {
                this.player.play();
            } else {
                this.player.pause();
            }
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Typography variant='caption'>Deserted Garden - Piano</Typography>
                <div className={this.props.classes.buttonPanel}>
                    <MenuItem button className={this.props.classes.button} onClick={this.togglePlay}><SkipPreviousIcon /></MenuItem>
                    <MenuItem button className={this.props.classes.button} onClick={this.togglePlay}>{this.props.isPlaying ? <MusicOnIcon /> : <MusicOffIcon />}</MenuItem>
                    <MenuItem button className={this.props.classes.button} onClick={this.togglePlay}><SkipNextIcon /></MenuItem>
                </div>
            </div>
        );
    }
}


export const createMusicPlayer = (name: string) => {
    store.register(name, mapReducerToStore(name));
    return connect(mapStateToProps(name), mapDispatchToProps(name))(withStyles(styles as any, { withTheme: true })(Component));
};

export default createMusicPlayer('MusicPlayer');
