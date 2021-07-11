import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import { orange, purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => ({
    root: {
        color: purple[50],
        backgroundColor: orange[700],
        borderColor: orange[700],
    }
}));


export default function CustomButton(props) {
    const classes = useStyles();
    const { title, functionButton, buttonType, startIcon } = props
    return (
       
            <Button className={classes.root} variant="contained" onClick={!functionButton ? null :functionButton} type={buttonType} startIcon={startIcon} >
                {title}
            </Button>
       

    );
}
