import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {getUsersOnPenndingDetailsAction} from '../redux/actions'
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { green } from '@material-ui/core/colors';
import {ignoreUser,approveUser} from '../redux/actions'


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  btnapprove:{
      color:green[500],
      marginLeft:"10px"

  },
  btn:{
      marginLeft:"55px"
  }
}));

export default function UsersList(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [userDetails,setUserDetails]=useState([])
  let {IsShown,seter ,usersId,id}=props

  useEffect(() => {
    console.log(userDetails,"userDetails")
    console.log(IsShown ,"dd",id,"userDetails")
    const usersDedails=async()=>{
      const users=await dispatch(getUsersOnPenndingDetailsAction(usersId))
      console.log(users,"userDetails")

      setUserDetails(users)
    }
    usersDedails()
   }, [])


    const ignoreButton=async(userId)=>{
     const users=await dispatch(ignoreUser(userId,id))
     if(users.length===0) seter(false)
     setUserDetails(users)
    }

    const approveButton=async(userId)=>{
      const users=await dispatch(approveUser(userId,id))
      if(users.length===0) seter(false)
      setUserDetails(users)
    }

    const item=userDetails.map(user=>{
        return (
            <ListItem>
                 <ListItemAvatar>
                  <Avatar src={`http://localhost:2001/userProfilePicture/${user.userId}`}/>
                 </ListItemAvatar> 
                 <ListItemText primary={user.user_name}/>
                 <Button variant="outlined" className={classes.btn} color="secondary" onClick={()=>{ignoreButton(user.userId)}}>
                  Ignore
                 </Button>
                 <Button variant="outlined" className={classes.btnapprove} onClick={()=>{approveButton(user.userId)}} >
                  approve
                 </Button>
            </ListItem>
        )
    })

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={IsShown ===id && userDetails.length>0}
        onClose={seter}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={IsShown ===id}>
        <div className={classes.paper}>
          <List >
           {item }
          </List>
        </div>
        </Fade>
      </Modal>
    </div>
  );
}
