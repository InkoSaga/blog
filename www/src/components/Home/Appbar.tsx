import { MenuItem, Paper, TextField, Theme, withStyles, WithStyles } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import { connect } from 'react-redux';
import * as store from '../../store';
import { background } from '../../Theme';
import Link from '../Common/Link';
import { isMobile } from 'is-mobile';

const mapReducerToStore = name => (state = {
    searchText: ''
}, action) => {
    switch (action.type) {
        case `${name}-SEARCH`:
            return { ...state, searchText: action.payload };
        default:
            return state;
    }
};

const mapStateToProps = name => state => ({
    searchText: state[name].searchText
});

const mapDispatchToProps = name => dispatch => ({
    search: (text: string) => dispatch({ type: `${name}-SEARCH`, payload: text }),
});

const styles = (theme: Theme) => ({
    appbar: {
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
        height: '48px',
        width: '100%',
        top: 0,
        background: background.acrylic80,
        position: 'fixed'
    },
    appbarButton: {
        paddingTop: 0,
        paddingBottom: 0,
        display: 'flex',
        justifyContent: 'center',
        height: '48px',
        width: '32px'
    },
    appbarLogo: {
        paddingLeft: '8px'
    },
    appbarSearch: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center'
    }
});

export class Component extends React.PureComponent<WithStyles<keyof ReturnType<typeof styles>> & ReturnType<ReturnType<typeof mapStateToProps>> & ReturnType<ReturnType<typeof mapDispatchToProps>>> {

    onSearchChange = event => this.props.search(event.target.value);

    render() {
        return (
            <Paper square className={this.props.classes.appbar}>

                <Link to='/' className={this.props.classes.appbarButton}>
                    <MenuItem button className={this.props.classes.appbarButton}>
                        <AppsIcon />
                    </MenuItem>
                </Link>
                <img className={this.props.classes.appbarLogo} src='/resources/logo.png' height={48} />
                {isMobile() ? null :
                    <div className={this.props.classes.appbarSearch}>
                        <TextField type='text' placeholder='搜索 / Search' onBlur={this.onSearchChange} />
                        <Link to={`/search/${this.props.searchText}`}>
                            <MenuItem button className={this.props.classes.appbarButton}><SearchIcon /></MenuItem>
                        </Link>
                    </div>}
            </Paper>
        );
    }
}

export const createAppbar = (name: string) => {
    store.register(name, mapReducerToStore(name));
    return (connect(mapStateToProps(name), mapDispatchToProps(name))(withStyles(styles as any, { withTheme: true })(Component)));
};

export default createAppbar('Appbar');
