import * as React from 'react';
import { connect } from 'react-redux';
import * as store from '../store';
import { background } from '../Theme';
import {
    Theme, withStyles, WithStyles,
    Grid,
    Paper,
    TextField,
    Button,
    FormControl,
    Input,
    InputLabel,
    Typography,
    Divider,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContentText,
    DialogContent
} from '@material-ui/core';

import { AUTH_URL, getAccessToken } from './Common/Github';


const mapReducerToStore = name => (state = {
    accessToken: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : ''
}, action) => {
    switch (action.type) {
        case `${name}-SET_ACCESS_TOKEN`:
            return { ...state, accessToken: action.payload };
        default:
            return state;
    }
};

const mapStateToProps = name => (state, ownProps) => ({
    code: ownProps.location.search.replace('?code=', '') ? ownProps.location.search.replace('?code=', '') : '',
    accessToken: state[name].accessToken
});

const mapDispatchToProps = name => dispatch => ({
    setAccessToken: token => dispatch({ type: `${name}-SET_ACCESS_TOKEN`, payload: token }),
});

const styles = (theme: Theme) => ({
    container: {
        zIndex: 0,
        background: 'rgba(0,0,0,0)'
    },
    paper: {
        background: 'rgba(0,0,0,0.8)'
    }
});

class Login extends React.PureComponent<WithStyles<keyof ReturnType<typeof styles>> & ReturnType<ReturnType<typeof mapStateToProps>> & ReturnType<ReturnType<typeof mapDispatchToProps>>> {

    getCode = () => window.location.href = AUTH_URL;

    refreshToken = () => {
        getAccessToken(this.props.code).then(token => {
            if (token) {
                localStorage.setItem('access_token', token as string);
                this.props.setAccessToken(token);
            } else {
                alert('获取登陆凭证失败, 请刷新登陆密钥后再次尝试');
            }
        }).catch(message => alert(message));
    }

    clearToken = () => {
        localStorage.removeItem('access_token');
        this.props.setAccessToken('');
    }

    render() {
        return (
            <Dialog open={true} classes={{paper: this.props.classes.container}} className={this.props.classes.container}>
                <Paper square className={this.props.classes.paper}>
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <DialogContentText variant='headline'>{'当前状态: '}{this.props.accessToken ? '已登陆' : '未登陆'}</DialogContentText>
                        <FormControl fullWidth>
                            <InputLabel>登陆密钥 / Code</InputLabel>
                            <Input disabled value={this.props.code} />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>登陆凭证 / Token</InputLabel>
                            <Input disabled value={this.props.accessToken} />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button fullWidth onClick={this.getCode}>获取登陆密钥 / Get Code</Button>
                        <Button fullWidth onClick={this.refreshToken}>获取登陆凭证 / Get Token</Button>
                        <Button fullWidth onClick={this.clearToken}>清除登陆凭证 / Clear Token</Button>
                    </DialogActions>
                </Paper>
            </Dialog>
        );
    }
}

export const Component = withStyles(styles as any, { withTheme: true })(Login);

export const createComponent = (name: string) => {
    store.register(name, mapReducerToStore(name));
    return connect(mapStateToProps(name), mapDispatchToProps(name))(Component);
};
export default createComponent('Login');
