import React ,{useState} from 'react';
import CustomCard from '../customComponents/customCard'
import { Grid } from '@material-ui/core';
import CustomHeader from './customHeader'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CustomCarousel from "../customComponents/customCarousel"
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import UsersList from './usersRequstsList'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        flexWrap: 'wrap',
        padding: '10px',
        margin: '10px',
        marginTop: '70px',
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
    notificationsicon:{
        color: "#ff9800" 
    }
}));

export default function EventGroup(props) {
    const {events ,header}=props
   const event=events.map(event=>{
    return(
        <Grid item xs={12} sm={6} md={4} >
        <CustomCard events={event} />
        </Grid> 
    )
})
    return (  
           <div>
             {events.length>0 ?<CustomHeader title={header}/> : null } 
            <Grid container>
             {event}
           </Grid>
           </div>
    )
}

export  function MyPosts(props) {
    const classes = useStyles();
    const [showUsers,setShowUsers]=useState(false)
    const {events ,header}=props
   
const notifictaionClick=(i)=>{
     setShowUsers(i)
}

const closeModal=()=>{
    setShowUsers(false)
    window.location.reload();
}

    return (  
           <div>
             {events.length>0 ?<CustomHeader title={header}/> : null } 
              <Grid container>
         
         {events.map((event)=>{
             return(
                 <Grid item xs={12} sm={6} md={4} >
                    <Card className={classes.root} >
                    <UsersList usersId={event.requestsPending} IsShown={showUsers} seter={closeModal} id={event._id}/>   
                   
                    <div className={classes.userNameContainer} >
                      <CardHeader
                         avatar={<Avatar aria-label="recipe" className={classes.avatar} src={`http://localhost:2001/userProfilePicture/${event.userId}`}></Avatar>}
                      />
                      <Badge badgeContent={event.requestsPending.length} color="error">
                       <NotificationsIcon className={classes.notificationsicon} onClick={()=>{notifictaionClick(event._id)}} /> 
                      </Badge>
                    </div>
                    <CustomCarousel imgEvent={event.img} className={classes.media} />

                  <CardContent>
                   <CardHeader title={event.eventName} subheader={event.dateOfEvent} />
                   <Typography variant="body2" color="textSecondary" component="p">
                    {event.description}
                   </Typography>
                  </CardContent>

                  <CardActions disableSpacing>
                    <IconButton >
                        <ShareIcon className={classes.icons} />
                    </IconButton>
                    <IconButton>
                        <CommentIcon className={classes.icons} />
                    </IconButton>
                  </CardActions>

               </Card>  
             </Grid> 
             )})}
         </Grid>
           </div>
    )
}