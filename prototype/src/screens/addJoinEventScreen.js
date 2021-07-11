import React, { useEffect, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import CustomButton from "../customComponents/customButton"
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import CustomInput from "../customComponents/customInput"
import useCustomForm, { useCustomFormFile } from '../utils/customHookForm';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import { addEventAction } from '../redux/actions'
import { useDispatch } from 'react-redux';
import CustomDateInput from '../customComponents/customDateInput';
import CustomCarousel from '../customComponents/customCarousel';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client'
import { convertBase64 } from '../utils/base64'
import { categories, validDate, RadioButtonsGroup } from '../utils/categoriesArray';


let socket
const useStyles = makeStyles((theme) => ({
    m: {
        paddingRight: "7px"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'orange',
        marginLeft: '60px'

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        justifyContent: "center",
        marginTop: "10%"
    }
}));

export default function AddJoinEventScreen() {
    const initialEvent = {
        eventName: '',
        description: '',
        location: '',
        dateOfEvent: '',
        category: 'sport',
    }
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const wrapperRef = useRef(null)
    const { register, handleSubmit, errors } = useForm();
    const [tagPeople, setTagPeople] = useState([])
    const [tagPeopleOptions, setTagPeopleOptions] = useState([])
    const [event, setEvent] = useCustomForm(initialEvent)
    const [file, setFile] = useState([])
    const [privacy, setPrivacy] = React.useState(true);

    useEffect(
        () => {
            socket = io('http://localhost:2002')
        }, [file]
    );

    const inputAddImgHandler = async (event) => {
        const selectedFile = event.target.files[0]
        if (!event.target.files[0]) return
        const base64 = await convertBase64(selectedFile)
        console.log(base64)
        setFile(file => [...file, { src: base64.base64 }])
    }

    const handelSaveEvent = () => {
        dispatch(addEventAction(event, tagPeople, file, privacy))
        history.push('/mainScreen')
    }

    const handelInputTagUser = (e) => {
        if (e.target.value.length >= 3) {
            const inputSearchUser = e.target.value
            socket.emit('tagValue', { inputValue: inputSearchUser }, ({ res }) => {
                setTagPeopleOptions(res)
            });
        }
    }

    return (
        <Container component="main"  >

            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit(handelSaveEvent)}>
                <FormControl variant="outlined" className={classes.formControl} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>

                            <InputLabel htmlFor="category">categories</InputLabel>
                            <Select native fullWidth onChange={setEvent} label="categories" defaultValue="sport" name="category" >
                                {categories.map((item, i) => {
                                    // return  <option value={item} key={i}>{item}</option>
                                })}
                            </Select>

                            <div className={classes.m}>
                                <CustomInput
                                    inputId="eventName"
                                    inputTitle="event name"
                                    inputFunction={setEvent}
                                    formName={register}
                                    inputType="text"
                                    fullWidth />

                                <CustomDateInput
                                    inputTitle="date of event"
                                    formName={register}
                                    inputId="dateOfEvent"
                                    inputErr={errors.dateOfEvent}
                                    inputFunction={setEvent}
                                    errMessage="Incorrect entry. date is not valid"
                                    inputValid={{
                                        required: true, validate: validDate
                                    }}
                                    dateType="datetime-local" />

                                <CustomInput
                                    inputId="description"
                                    inputTitle="Tell us a little about the event"
                                    inputFunction={setEvent}
                                    formName={register}
                                    inputType="text"
                                    fullWidth />

                                <CustomInput
                                    inputId="location"
                                    inputTitle="Where the event is located"
                                    inputFunction={setEvent}
                                    inputErr={errors.location}
                                    inputValid={{ required: true }}
                                    errMessage=" you need to peek location"
                                    formName={register}
                                    fullWidth />
                            </div>

                            <Autocomplete
                                multiple
                                onChange={(e, value) => { setTagPeople(value) }}
                                inputId="userTag"
                                options={tagPeopleOptions}
                                getOptionLabel={(option) => option.user_name}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="search friends to join"
                                        onChange={handelInputTagUser} />)}
                            />

                            <RadioButtonsGroup seter={setPrivacy} value={privacy} />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Badge >
                                <Avatar className={classes.avatar} onClick={() => {
                                    wrapperRef.current.click()
                                }}>
                                    <AddAPhotoIcon />
                                </Avatar>
                            </Badge>
                            <input type="file" hidden={true} id="file" onChange={inputAddImgHandler} ref={wrapperRef} />

                            <CustomCarousel imgEvent={file} />

                        </Grid>
                    </Grid>
                    <CustomButton title="add event" buttonType="submit" />
                </FormControl>
            </form>

        </Container>
    );
}

