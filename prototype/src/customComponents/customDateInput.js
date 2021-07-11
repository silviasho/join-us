import React ,{useState} from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { orange } from '@material-ui/core/colors';
import { format} from 'date-fns'

const useStyles = makeStyles((theme) => ({
    // margin: {
    //     margin: theme.spacing(1),
    //     width:"100%"
    // },
}));

const theme = createMuiTheme({
    palette: {
        primary: orange,
    }
});

export default function CustomDateInput(props) {
    const classes = useStyles();
    const { inputId, inputTitle, inputFunction, inputErr, fullWidth, formName, inputValid, errMessage ,dateType} = props
    return (

        <ThemeProvider theme={theme}>
            <TextField
                className={classes.margin}
                id={inputId}
                label={inputTitle}
                type={dateType}
                variant="outlined"
                format="dd/MM/yyyy"
                defaultValue={format(new Date(),"HH:mm dd/MM/yyyy")}
                InputLabelProps={{
                    shrink: true,
                }}
                name={inputId}
                onChange={inputFunction}
                fullWidth={fullWidth}
                error={inputErr}
                helperText={inputErr && errMessage}
                inputRef={formName(inputValid)}
            />
        </ThemeProvider>
    );
}
