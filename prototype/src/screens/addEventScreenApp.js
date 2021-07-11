import React, { useEffect, useState, useRef } from 'react'
import { Grid, Segment, Button, Form, Icon, Header,Image } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { addEventAction } from '../redux/actions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { categories, RadioButtonsGroup } from '../utils/categoriesArray';
import io from 'socket.io-client';
import { convertBase64 } from '../utils/base64';
import Badge from '@material-ui/core/Badge';
import { useHistory } from 'react-router-dom';
import CustomCarousel from '../customComponents/customCarousel';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
let socket


export default function AddEventApp(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const wrapperRef = useRef(null)
    const [privacy, setPrivacy] = React.useState(true);
    const [tagPeople, setTagPeople] = useState([])
    const [file, setFile] = useState([])
    const [tagPeopleOptions, setTagPeopleOptions] = useState([])
    const [events, setEvent] = useState({
        eventName: "",
        category: '',
        dateOfEvent: '',
        location: '',
        description: '',
    });

    useEffect(
        () => {
            socket = io('http://localhost:2002')
        }, [file]
    );

    const handelInputTagUser = (e) => {
        if (e.target.value.length >= 3) {
            const inputSearchUser = e.target.value
            console.log(e)
            console.log(inputSearchUser)
            socket.emit('tagValue', { inputValue: inputSearchUser }, ({ res }) => {
                setTagPeopleOptions(res)
            });
        }
    }

    const onChange = (event, result) => {
        const { name, value } = result || event.target;
        setEvent({ ...events, [name]: value });
    };

    const handelAddEvent = () => {
        dispatch(addEventAction(events, tagPeople, file, privacy))
        history.push('/mainScreen')
    }

    const inputAddImgHandler = async (event) => {
        const selectedFile = event.target.files[0]
        if (!event.target.files[0]) return
        const base64 = await convertBase64(selectedFile)
        console.log(base64)
        setFile(file => [...file, { src: base64.base64 }])
    }

    return (<Form noValidate>
        <Grid centered fluid columns={2} verticalAlign='middle' divided  >
            <Grid.Row>
                <Grid.Column>
                <Image src='../../joinUsLogo.png' centered />
                    <Header as='h2' icon color='orange' textAlign='center' style={{ marginTop: -20 }}n>
                Make New Join Event
            </Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row >
                <Grid.Column mobile={16} tablet={2} computer={6}>
                    <Segment >
                        <Form.Input fluid name='eventName' placeholder='Name Your Event' type='text' onChange={onChange} />
                        <Form.Dropdown fluid name='category' placeholder='Caterories' options={categories} selection value={events.category} onChange={onChange} />
                        <Form.Input fluid name='dateOfEvent' placeholder='Date And Time ' type='datetime-local' onChange={onChange} />
                        <Form.Input fluid name='location' placeholder='Location' type='text' onChange={onChange} />
                        <Form.Input fluid name='description' placeholder='Tell Us About The Event' type='text' onChange={onChange} />
                        <Autocomplete
                            multiple
                            onChange={(e, value) => { setTagPeople(value) }}
                            inputId="userTag"
                            placeholder='Search People To Join'
                            options={tagPeopleOptions}
                            getOptionLabel={(option) => option.user_name}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    onChange={handelInputTagUser} />)}
                        />
                        <RadioButtonsGroup seter={setPrivacy} value={privacy} />
                    </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={2} computer={6}>
                    <Segment >
                        <Badge >
                            <Icon name='picture' onClick={() => {
                                wrapperRef.current.click()
                            }}>
                                <AddAPhotoIcon />
                            </Icon>
                        </Badge>
                        <input type="file" hidden={true} id="file" onChange={inputAddImgHandler} ref={wrapperRef} />

                        <CustomCarousel imgEvent={file} />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Segment >
                    <Button color='teal' size='large' onClick={handelAddEvent} >Join Us</Button>
                </Segment>
            </Grid.Row>
        </Grid>
    </Form>
    )
}