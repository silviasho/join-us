import React, { useEffect } from 'react'
import CustomCard from '../customComponents/customCard'
import { Grid } from '@material-ui/core';
import { getEventAction } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import FiltersEventsApp from '../customComponents/filtersEventApp'


export default function MainScreen() {
    const eventsFromState = useSelector(state => state.events)
    const dispatch = useDispatch()
    useEffect(() => {
        const eventsFromDb = async () => {
            dispatch(getEventAction())
        }
        eventsFromDb()

    }, [])


    const events = eventsFromState.map((event, i) => {
        return (
            <Grid item xs={12} sm={6} md={4} key={i}>
                <CustomCard events={event} />
            </Grid>
        );
    });

    return (
        <div>
            <FiltersEventsApp />
            <Grid container>
                {events}
            </Grid>
        </div>
    )
}