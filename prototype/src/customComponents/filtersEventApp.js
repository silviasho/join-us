import React, { useState } from 'react'
import { Grid, Segment, Button, Form, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { sandFiltersToServer } from '../redux/actions';
import { categories } from '../utils/categoriesArray';



export default function FiltersEventsApp(props) {
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        category: "",
        dateOfEvent: '',
        location: ''
    });

    const onChange = (event, result) => {
        const { name, value } = result || event.target;
        setValues({ ...values, [name]: value });
    };

    const handelFilter = () => {
        dispatch(sandFiltersToServer(values))

    }

    return (<Form noValidate>
        <Grid centered columns={4}  >
            <Grid.Row>
                <Grid.Column>
                    <Segment>
                        <Form.Dropdown fluid name='category' options={categories} selection value={values.category} placeholder='Caterories' onChange={onChange} />
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <Form.Input fluid name='dateOfEvent' iconPosition='left' placeholder='Date And Time ' type='datetime-local' onChange={onChange} />
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <Form.Input fluid name='location' icon='location arrow' iconPosition='left' placeholder='Location' type='text' onChange={onChange} />
                    </Segment>
                </Grid.Column>
                <Button color='orange' floated='left' size='huge' style={{ height: 60, marginTop: 4 }} onClick={handelFilter}><Icon name='search' iconPosition='center' />Filter</Button>
            </Grid.Row>
        </Grid>
    </Form>
    )
}