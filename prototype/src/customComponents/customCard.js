import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from  '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useHistory } from 'react-router-dom';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import CustomCarousel from "../customComponents/customCarousel"
import CustomButton from "../customComponents/customButton"
import { useDispatch } from 'react-redux'
import { requestToJoinAction } from '../redux/actions'
import NestedList from './commentsComponent'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        flexWrap: 'wrap',
        padding: '10px',
        margin: '10px',
        marginTop: '70px',

    },
    avatar: {
        display: 'inline-flex'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    userNameContainer: {
        display: "inline-flex"
    },
    icons: { color: "#ff9800" },

}));

export default function CustomCard(props) {
    const { events } = props
    const dispatch = useDispatch()
    const classes = useStyles();
    const history = useHistory()
    const [Requested, setRequested] = React.useState(false);
    const { userId, tagPeople } = events

    const goToUserProfile = () => {
        history.push(`/userProfileScreen?userId=${userId}`)
    }

    const hendelJoinRequest = async (event) => {
        await dispatch(requestToJoinAction(event))
        setRequested(!Requested)
    }
    useEffect(() => {
        const [first] = events.requestsPending
        setRequested(first)
    }, [])

    return (
        <Card className={classes.root} >
            <div className={classes.userNameContainer} onClick={goToUserProfile}>
                <CardHeader
                    avatar={<Avatar aria-label="recipe" className={classes.avatar}   >

                        <img src={`http://localhost:2001/userEvetPicture/${events.userId}`} height="50" width="50" />
                    </Avatar>}

                />
            </div>

            <CustomCarousel imgEvent={events.img} className={classes.media} category={events.category} />

            <CardContent>
                <CardHeader
                    title={events.eventName}
                    subheader={events.location}

                />
                <Typography variant="body2" color="textSecondary" component="p">
                    {events.dateOfEvent}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {events.description}
                </Typography>

                <AvatarGroup className={classes.avatar} max={4}>
                    {tagPeople.map(item => {
                        return <Avatar alt={item.user_name} src={`http://localhost:2001/userEvetPicture/${item.userId}`} />
                    })}

                </AvatarGroup>
            </CardContent>

            <CardActions disableSpacing >
                <CustomButton title={!Requested ? "request to join" : "cancel"}
                    functionButton={() => { hendelJoinRequest(events) }}
                />
               
               <IconButton >
                    <LocationOnIcon className={classes.icons} />
                </IconButton>

                <IconButton >
                    <ShareIcon className={classes.icons} />
                </IconButton>
            </CardActions>
            <NestedList />
             
        </Card>
    );
}

