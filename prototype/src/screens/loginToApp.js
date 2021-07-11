import React from 'react'
import { Grid, Segment, Header, Button, Icon, Form, Image } from 'semantic-ui-react';
import Link from '@material-ui/core/Link';
import useCustomForm from '../utils/customHookForm';
import { loginAction } from '../redux/actions';
import { useDispatch } from 'react-redux';



export default function LoginToApp(props) {
    const dispatch = useDispatch()
    const initialUser = {
        userName: '',
        password: '',
    }
    const [user, setUser] = useCustomForm(initialUser)
    const handelLogin = async () => {
        try {
            const { password, userName } = user
            if (!userName || !password) throw new Error();
            console.log(user)
            const OK = await dispatch(loginAction(user));
            if (OK) {
                props.history.push('/mainScreen')
            }
            else throw new Error()
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <Grid textAlign='center' verticalAlign='middle' className='loginRegister'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image src='../../joinUsLogo.png' centered />
                <Header as='h2' icon color='orange' textAlign='center' style={{ marginTop: -20 }}>
                    Login And Join Us
            </Header>
                <Form size='large' noValidate>
                    <Segment stacked>

                        <Form.Input fluid name='userName' icon='user' iconPosition='left' placeholder='User Name' type='text' onChange={setUser} />
                        <Form.Input fluid name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={setUser} />

                        <Button color='teal' fluid size='large' onClick={handelLogin}>Join Us</Button>
                    </Segment>
                    <Link href="/registerApp" >
                        Don't have an account? Sign Up
                    </Link>
                </Form>
            </Grid.Column>
        </Grid>
    )
}