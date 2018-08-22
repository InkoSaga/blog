import { Divider, List, MenuItem, Paper, Button, BottomNavigation, BottomNavigationAction, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ComputerIcon from '@material-ui/icons/Computer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GamesIcon from '@material-ui/icons/Games';
import ImageIcon from '@material-ui/icons/Image';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import InputIcon from '@material-ui/icons/Input';
import CreateIcon from '@material-ui/icons/Create';
import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { background } from '../../Theme';
import Link from '../Common/Link';
import { isMobile } from 'is-mobile';

const styles = (theme: Theme) => ({
    navMenu: {
        top: '48px',
        left: 0,
        zIndex: 1,
        width: '64px',
        height: 'calc(100vh - 48px)',
        position: 'fixed',
        background: background.acrylic40,
        transition: 'height 0.2s',
        '&:hover': {
            background: background.acrylic80,
            transition: 'background-image 0.2s ease-in-out'
        }
    },
    navMenuList: {
        padding: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    navMenuItem: {
        width: '32px',
        paddingLeft: '20px',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        '&:hover': {
            width: '240px',
            backgroundColor: theme.palette.action.hover
        },
        '&:active': {
            width: '240px',
            backgroundColor: theme.palette.action.hover
        }
    },
    navMenuItemText: {
        marginLeft: 'auto',
        paddingLeft: '16px',
        paddingRight: '16px'
    },
    pull: {
        flex: '1'
    },
    bottomNav: {
        bottom: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        position: 'fixed',
        background: background.acrylic90
    },
    bottomNavButton: {
        minWidth: '0px'
    },
    bottomEditButton: {
        position: 'fixed',
        left: 0,
        bottom: 56,
        zIndex: 1
    },
    bottomLoginButton: {
        position: 'fixed',
        right: 0,
        bottom: 56,
        zIndex: 1
    }
});

export class Component extends React.PureComponent<WithStyles<keyof ReturnType<typeof styles>>> {

    NavButton = (props: { link: string; text: string; icon: any }) =>
        <Link to={props.link}>
            <MenuItem button className={this.props.classes.navMenuItem}>
                <ListItemIcon>
                    <props.icon />
                </ListItemIcon>
                <Typography className={this.props.classes.navMenuItemText} variant='subheading'>{props.text}</Typography>
            </MenuItem>
        </Link>

    renderDesktop = () =>
        <Paper square className={this.props.classes.navMenu}>
            <List className={this.props.classes.navMenuList}>
                <this.NavButton link='/life' text='日常记事 / Life' icon={DashboardIcon} />
                <this.NavButton link='/programming' text='编程相关 / Programming' icon={KeyboardIcon} />
                <this.NavButton link='/drawing' text='漫画随笔 / Drawing' icon={ImageIcon} />
                <this.NavButton link='/gaming' text='游戏感想 / Gaming' icon={GamesIcon} />
                <Divider />
                <this.NavButton link='/playground' text='试验区 / Playground' icon={ComputerIcon} />
                <div className={this.props.classes.pull} />
                <Divider />
                <this.NavButton link='/private' text='私人 / Private' icon={FavoriteIcon} />
                <this.NavButton link='/edit' text='编辑 / Edit' icon={CreateIcon} />
                <this.NavButton link='/login' text='登陆 / Login' icon={InputIcon} />
            </List>
        </Paper>

    BottomNavButton = (props: { link: string; icon: any }) =>
        <BottomNavigationAction classes={{ root: this.props.classes.bottomNavButton }} icon={
            <Link to={props.link}>
                <props.icon />
            </Link>} />


    renderMobile = () =>
        <React.Fragment>
            <BottomNavigation className={this.props.classes.bottomNav}>
                <this.BottomNavButton link='/life' icon={DashboardIcon} />
                <this.BottomNavButton link='/programming' icon={KeyboardIcon} />
                <this.BottomNavButton link='/drawing' icon={ImageIcon} />
                <this.BottomNavButton link='/gaming' icon={GamesIcon} />
                <this.BottomNavButton link='/private' icon={FavoriteIcon} />
            </BottomNavigation>
            <Button color='primary' className={this.props.classes.bottomEditButton}>
                <Link to='/edit'>
                    <CreateIcon />
                </Link>
            </Button>
            <Button color='primary' className={this.props.classes.bottomLoginButton}>
                <Link to='/login'>
                    <InputIcon />
                </Link>
            </Button>
        </React.Fragment>

    render() {
        return isMobile() ? this.renderMobile() : this.renderDesktop();
    }
}

export default (withStyles(styles as any, { withTheme: true })(Component));
