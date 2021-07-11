import React, { useState } from 'react'
import { Grid, Segment, Header, Button, Icon, Form, Message, Image } from 'semantic-ui-react';
import Link from '@material-ui/core/Link';
import useCustomForm from '../utils/customHookForm';
import { saveUserAction } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { compareAsc } from 'date-fns';



export default function RegisterToApp(props) {
    const dispatch = useDispatch()
    const initialUser = {
        fullName: '',
        userName: '',
        password: '',
        passwordConfirm: '',
        birthDate: ''
    }

    const [user, setUser] = useCustomForm(initialUser)
    const [errors, setErrors] = useState('')
    const ifFormValid = () => {

        if (ifFormEmpty(user)) {
            setErrors('fill in all fields')
            return false;
        } else if (!isPasswordValid(user)) {
            setErrors('password not valid')
            return false;
        } else if (!isBirthDateValid(user)) {
            setErrors('birth date not valid')
            return false;
        } else {
            return true;
        }
    }

    const isBirthDateValid = () => {
        const today = new Date()
        const userInputDate = new Date(user.birthDate)
        const validDate = compareAsc(today, userInputDate)
        if (validDate !== 1) return false
        return true
    }

    const isPasswordValid = ({ password, passwordConfirm }) => {
        if (password.length < 6 || passwordConfirm.length < 6 || password !== passwordConfirm) {
            return false
        } else {
            return true;
        }
    }

    const ifFormEmpty = ({ fullName, userName, password, passwordConfirm, birthDate }) => {
        return !fullName.length || !userName.length || !password.length || !passwordConfirm.length || !birthDate.length
    }

    const handelRegister = async () => {
        console.log(ifFormValid())
        if (ifFormValid()) {
            const notValid = await dispatch(saveUserAction(user))
            if (notValid) return alert(notValid)
            props.history.push('/mainScreen')
        } else {
            alert(errors)
        }
    }
    return (

        <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image src='../../joinUsLogo.png' centered />
                <Header as='h2' icon color='teal' textAlign='center' style={{ marginTop: -20 }}>
                    Register And Join Us
            </Header>
                <Form size='large' noValidate>
                    <Segment stacked>
                        <Form.Input fluid name='fullName' icon='user' iconPosition='left' placeholder='Full Name' type='text' onChange={setUser} />
                        <Form.Input fluid name='userName' icon='user' iconPosition='left' placeholder='User Name' type='text' onChange={setUser} />
                        <Form.Input fluid name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={setUser} />
                        <Form.Input fluid name='passwordConfirm' icon='repeat' iconPosition='left' placeholder='Password Confirm' type='password' onChange={setUser} />
                        <Form.Input fluid name='birthDate' placeholder='Date Of Birth' type='date' onChange={setUser} />
                        <Button color='orange' fluid size='large' onClick={handelRegister}>Join Us</Button>
                    </Segment>
                    <Link href="/" >
                        Already registered login
                </Link>
                </Form>
                {errors && (
                    <Message error>
                        <h3>Error</h3>
                        {errors}
                    </Message>
                )}
            </Grid.Column>

        </Grid>
    )
}