import React from 'react';
import {  makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { orange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
   
    margin: {
        margin: theme.spacing(1),
        width:"100%",
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: orange,
    }
});

export default function CustomizedInputs(props) {
    const classes = useStyles();
    const { inputId, inputTitle, inputFunction, inputErr, formName, fullWidth, inputValid, errMessage, type } = props
    return (

        <ThemeProvider theme={theme}>

            <TextField
                className={classes.margin}
                label={inputTitle}
                variant="outlined"
                id={inputId}
                name={inputId}
                multiline
                fullWidth={fullWidth}
                placeholder={inputTitle}
                onChange={inputFunction}
                error={inputErr}
                helperText={inputErr && errMessage}
                inputRef={formName(inputValid)}
                type={type}

            />

        </ThemeProvider>
    );
}
