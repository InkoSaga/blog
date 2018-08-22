import { Divider, Paper, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { background } from '../../Theme';
import Clock from './Clock';
import Calendar from './Calendar';
import Link from '../Common/Link';
import MusicPlayer from './MusicPlayer';

const styles = (theme: Theme) => ({
    pull: {
        flex: '1'
    },
    sidePanel: {
        width: '214px',
        height: 'calc(100% - 48px - 64px)',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        top: 48 + 32,
        right: 32,
        padding: theme.spacing.unit * 2,
        background: background.acrylic40,
        //'backdrop-filter': 'blur(24px) opacity(40%)', 
        //'-webkit-backdrop-filter': 'blur(24px) opacity(40%)', 
        '&:hover': {
            background: background.acrylic80,
            transition: 'background-image 0.1s ease-in-out'
        }
    },
    sidePanelAbout: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    sidePanelPlayer: {
        right: 0,
        bottom: 0
    }
});

export class Component extends React.PureComponent<WithStyles<keyof ReturnType<typeof styles>>> {

    render() {
        return (
            <Paper square className={this.props.classes.sidePanel}>
                <Clock />
                <Divider />
                <Calendar />
                <Divider />
                <div className={this.props.classes.sidePanelAbout}>
                </div>
                <div className={this.props.classes.pull} />
                <Divider />
                <MusicPlayer />
            </Paper>
        );
    }
}

export default (withStyles(styles as any, { withTheme: true })(Component));
