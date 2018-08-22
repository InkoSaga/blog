import * as React from 'react';
import { Link } from 'react-router-dom';
import { Theme, withStyles, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) => ({
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

export default withStyles(styles as any, { withTheme: true })(
    (props: { to: string; className?:string }) =>
        <Link className={`${(props as any).classes.link} ${(props as any).classes.className}`} to={props.to}>{(props as any).children}</Link>
);
