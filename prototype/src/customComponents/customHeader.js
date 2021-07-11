import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
    root: {
        color: orange[700],
    }
}));


export default function CustomHeader(props) {
    const classes = useStyles();
    const { title } = props
    return (
        <h1 className={classes.root}>{title}</h1>
    );
}
