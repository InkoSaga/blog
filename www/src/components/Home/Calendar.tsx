import * as React from 'react';
import { connect } from 'react-redux';
import * as store from '../../store';
import { 
    Theme, withStyles, WithStyles,
    Typography,
    Button,
    Divider
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const mapReducerToStore = name => (state = {
    param: {}
}, action) => {
    switch (action.type) {
        case `${name}-ACTION`:
            return { ...state, navMenuOpened: action.payload };
        default:
            return state;
    }
};

const mapStateToProps = name => state => ({
    param: state[name].param
});

const mapDispatchToProps = name => dispatch => ({
    action: (param: any) => dispatch({ type: `${name}-ACTION`, payload: param })
});

const styles = (theme: Theme) => ({
    calendarContainer: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    calendarHeading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit
    },
    calendarButton: {
        minWidth: 0,
        width: '36px',
        height: '24px',
        padding: 0
    },
    calendarBody: {

    },
    calendarNotes: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit
    }
});

export class Component extends React.PureComponent<WithStyles<keyof ReturnType<typeof styles>> & ReturnType<ReturnType<typeof mapStateToProps>> & ReturnType<ReturnType<typeof mapDispatchToProps>>> {

    public render() {
        return (
            <div>
                <div className={this.props.classes.calendarContainer}>
                    <div className={this.props.classes.calendarHeading}>
                        <Typography variant='caption'>
                            {(new Date()).toLocaleDateString()}
                        </Typography>
                        <div>
                            <Button className={this.props.classes.calendarButton}><ExpandMoreIcon /></Button>
                            <Button className={this.props.classes.calendarButton}><ExpandLessIcon /></Button>
                        </div>
                    </div>
                    <div className={this.props.classes.calendarBody}>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th><Typography variant='caption'>一</Typography></th>
                                    <th><Typography variant='caption'>二</Typography></th>
                                    <th><Typography variant='caption'>三</Typography></th>
                                    <th><Typography variant='caption'>四</Typography></th>
                                    <th><Typography variant='caption'>五</Typography></th>
                                    <th><Typography variant='caption'>六</Typography></th>
                                    <th><Typography variant='caption'>日</Typography></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th><Typography variant='caption'>1</Typography></th>
                                    <th><Typography variant='caption'>2</Typography></th>
                                    <th><Typography variant='caption'>3</Typography></th>
                                    <th><Typography variant='caption'>4</Typography></th>
                                    <th><Typography variant='caption'>5</Typography></th>
                                    <th><Typography variant='caption'>6</Typography></th>
                                    <th><Typography variant='caption'>7</Typography></th>
                                </tr>
                                <tr>
                                    <th><Typography variant='caption' style={{ background: '#0078D7' }}>8</Typography></th>
                                    <th><Typography variant='caption'>9</Typography></th>
                                    <th><Typography variant='caption'>10</Typography></th>
                                    <th><Typography variant='caption'>11</Typography></th>
                                    <th><Typography variant='caption'>12</Typography></th>
                                    <th><Typography variant='caption'>13</Typography></th>
                                    <th><Typography variant='caption'>14</Typography></th>
                                </tr>
                                <tr>
                                    <th><Typography variant='caption'>15</Typography></th>
                                    <th><Typography variant='caption'>16</Typography></th>
                                    <th><Typography variant='caption'>17</Typography></th>
                                    <th><Typography variant='caption'>18</Typography></th>
                                    <th><Typography variant='caption'>19</Typography></th>
                                    <th><Typography variant='caption'>20</Typography></th>
                                    <th><Typography variant='caption'>21</Typography></th>
                                </tr>
                                <tr>
                                    <th><Typography variant='caption'>22</Typography></th>
                                    <th><Typography variant='caption'>23</Typography></th>
                                    <th><Typography variant='caption'>24</Typography></th>
                                    <th><Typography variant='caption'>25</Typography></th>
                                    <th><Typography variant='caption'>26</Typography></th>
                                    <th><Typography variant='caption'>27</Typography></th>
                                    <th><Typography variant='caption'>28</Typography></th>
                                </tr>
                                <tr>
                                    <th><Typography variant='caption'>29</Typography></th>
                                    <th><Typography variant='caption'>30</Typography></th>
                                    <th><Typography variant='caption'>31</Typography></th>
                                    <th><Typography variant='caption' style={{ color: 'grey' }}>1</Typography></th>
                                    <th><Typography variant='caption' style={{ color: 'grey' }}>2</Typography></th>
                                    <th><Typography variant='caption' style={{ color: 'grey' }}>3</Typography></th>
                                    <th><Typography variant='caption' style={{ color: 'grey' }}>4</Typography></th>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
                <div className={this.props.classes.calendarNotes}>
                <Typography variant='caption'>无事件</Typography>
                </div>
            </div>
        );
    }
}


export const createComponent = (name: string) => {
    store.register(name, mapReducerToStore(name));
    return connect(mapStateToProps(name), mapDispatchToProps(name))(withStyles(styles as any, { withTheme: true })(Component));
};
export default createComponent('Calendar');
