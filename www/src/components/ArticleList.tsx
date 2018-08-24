import * as React from 'react';
import { connect } from 'react-redux';
import * as store from '../store';
import { background } from '../Theme';
import {
    Theme, withStyles, WithStyles,
    Grid,
    Paper,
    Typography,
    Chip,
    Divider
} from '@material-ui/core';
import Link from './Common/Link'

//import Cms from './Common/Cms';

const toDateString = (time: Date) => time.toLocaleDateString('zh-Hans-CN', { year: 'numeric', month: 'long', day: 'numeric' });

const mapReducerToStore = name => (state = {
    indexes: []
}, action) => {
    switch (action.type) {
        case `${name}-FETCH_SUMMARIES`:
            return { ...state, indexes: action.payload };
        default:
            return state;
    }
};

const mapStateToProps = name => (state, ownProps) => ({
    category: (ownProps.match.path as string).substr(1),
    indexes: state[name].indexes
});

const mapDispatchToProps = name => dispatch => ({
    fetchSummaries: articles => dispatch({ type: `${name}-FETCH_SUMMARIES`, payload: articles }),
});

const styles = (theme: Theme) => ({
    paper: {
        padding: theme.spacing.unit * 2,
        background: background.acrylic20,
        '&:hover': {
            background: background.acrylic80,
            transition: 'background-image 0.1s ease-in-out'
        }
    },
    heading: {
        paddingBottom: 6
    },
    subHeading: {
        paddingTop: 6,
        paddingBottom: 6
    },
    body: {
        paddingTop: 6,
        paddingBottom: 6,
        textIndent: theme.spacing.unit
    },
    tag: {
        margin: 4,
        height: 18,
        '&:hover': {
            background: theme.palette.action.hover
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            color: theme.palette.action.hover
        },
        '&:active': {
            color: theme.palette.secondary.main
        }
    }
});

class ArticleList extends React.PureComponent<WithStyles<keyof ReturnType<typeof styles>> & ReturnType<ReturnType<typeof mapStateToProps>> & ReturnType<ReturnType<typeof mapDispatchToProps>>> {

    componentDidMount() {
        //Cms.clearToken();
        //this.fetchSummary(this.props.category);
    }

    //fetchSummary = category =>
    //    Cms.getEntries('summary', {category: category, _sort: 'createdAt:desc', _limit: 10})
    //    .then(articles => this.props.fetchSummaries(articles))
    //    .catch(console.warn);

    Item = props =>
        <Grid item xs={12}>
            <Paper square className={this.props.classes.paper}>
                {props.children}
            </Paper>
        </Grid>

    Article = props =>
        <this.Item>
            <Typography className={this.props.classes.heading} variant='subheading'><Link to={`/article/${props.title}`}>{props.title}</Link></Typography>
            <Divider />
            <Typography className={this.props.classes.subHeading} variant='caption'>{toDateString(new Date(props.createdAt))}
                {props.tags.map((tag, key) =>
                    <Link key={key} to={`/tag/${tag}`}>
                        <Chip className={this.props.classes.tag} clickable color='primary' label={tag} />
                    </Link>
                )}
            </Typography>
            <Typography className={this.props.classes.body} variant='caption' >{props.summary}</Typography>
            
        </this.Item>

    render() {
        return (
            <Grid container spacing={32} justify='center' alignItems='center'>
                {this.props.indexes.map((entry, key) => <this.Article key={key} {...entry} />)}
            </Grid>
        );
    }
}

export const Component = withStyles(styles as any, { withTheme: true })(ArticleList);

export const createComponent = (name: string) => {
    store.register(name, mapReducerToStore(name));
    return connect(mapStateToProps(name), mapDispatchToProps(name))(Component);
};
export default createComponent('ArticleList');
