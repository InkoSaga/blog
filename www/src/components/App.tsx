import { Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import * as store from '../store';
import { isMobile } from 'is-mobile';


import Appbar from './Home/Appbar';
import NavMenu from './Home/NavMenu';
import SidePanel from './Home/SidePanel';
import ArticleViewer from './ArticleViewer';
import Login from './Login';

import { createComponent as createArticleList } from './ArticleList';

const HomeList = createArticleList('home');

const LifeList = createArticleList('life');
const ProgrammingList = createArticleList('programming');
const GamingList = createArticleList('gaming');
const DrawingList = createArticleList('drawing');



const mapReducerToStore = name => (state = {
  param: {}
}, action) => {
  switch (action.type) {
    case `${name}-ACTION`:
      return { ...state, param: action.payload };
    default:
      return state;
  }
};

const mapStateToProps = name => state => ({
});

const mapDispatchToProps = name => dispatch => ({
});

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute'
  },
  contentContainer: {
    width: 'calc(100% - 374px)',
    height: 'auto',
    marginLeft: 64 + 32,
    marginRight: 246 + 32,
    marginTop: 48 + 32,
    marginBottom: 48 + 32,
    display: 'flex'
  },
  contentContainerMobile: {
    width: 'calc(100% - 32px)',
    height: 'auto',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 48 + 16,
    marginBottom: 48 + 16,
    display: 'flex'
  }
});

export class Component extends React.PureComponent<WithStyles<keyof ReturnType<typeof styles>> & ReturnType<ReturnType<typeof mapStateToProps>> & ReturnType<ReturnType<typeof mapDispatchToProps>>> {

  renderContent = () =>
    <div className={isMobile() ? this.props.classes.contentContainerMobile : this.props.classes.contentContainer}>
      <Switch>
        <Route exact path='/' component={HomeList} />
        <Route exact path='/life' component={LifeList} />
        <Route exact path='/programming' component={ProgrammingList} />
        <Route exact path='/gaming' component={GamingList} />
        <Route exact path='/drawing' component={DrawingList} />
        <Route exact path='/article/:name' component={ArticleViewer} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </div>

  render() {
    return (
      <div>fuck samsung</div>
    );
    //return (
    //  <div className={this.props.classes.root}>
    //    <Appbar />
    //    <NavMenu />
    //    {this.renderContent()}
    //    {isMobile() ? null : <SidePanel />}
    //  </div>
    //);
  }
}



export const createApp = (name: string) => {
  store.register(name, mapReducerToStore(name));
  return withRouter((connect(mapStateToProps(name), mapDispatchToProps(name))(withStyles(styles as any, { withTheme: true })(Component)) as any));
};

export default createApp('App');
