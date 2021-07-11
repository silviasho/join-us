import React, { useState, useRef, useEffect } from 'react'
import CustomButton from '../customComponents/customButton'
import { updateProfilePicAction } from "../redux/actions"
import { useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import EditIcon from '@material-ui/icons/Edit';
import EventGroup,{MyPosts} from '../customComponents/customEventCarousel'
import {getMyEventAction} from '../redux/actions'
import {convertBase64} from '../utils/base64'

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: "150px",
        width: "150px"
    },
    root: {
        display: 'flex',
        justifyContent: "center",
        '& > *': {
            margin: theme.spacing(1),
        },

    },
    mainBox: {
        justifyContent: "center",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        marginTop: '30px',
        height: '250px',
        display: 'inline-block',


    }
}));

const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 30,
        height: 30,
        border: `2px solid ${theme.palette.background.paper}`,
    },

}))(Avatar);

export default function MyProfileScreen() {
    const classes = useStyles();
    const wrapperRef = useRef(null)
    const [file, setFile] = useState('')
    const [avatarSrc, setAvatarSrc] = useState('')
    const initialState={
    myEventsPost:[] ,
    eventIHaveBeenIn:[],
    requstOnPending:[]
    }
    const [allEvents, setAllEvents] = useState(initialState)
    const dispatch = useDispatch()

    const addImgHandler = () => {
        const fd = new FormData
        fd.append('file', file)
        dispatch(updateProfilePicAction(fd))
    }

    const inputAddImgHandler =async (event) => {
    setFile(event.target.files[0])  
    const base64=await convertBase64(event.target.files[0])
    setAvatarSrc(base64.base64)
    }

    useEffect(() => {
    const eventsFromDb = async () => {
      setAvatarSrc(`http://localhost:2001/pictureByToken/${localStorage.getItem("token")}`)
      const res= await dispatch(getMyEventAction())
      setAllEvents(res)
    }
    eventsFromDb()
},[])

    return (
        <div >
            <div className={classes.root}>                
                <Badge

                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={<SmallAvatar  > <EditIcon className={classes.orange} onClick={() => {
                        wrapperRef.current.click()
                    }} /> </SmallAvatar>}
                >
                    <Avatar
                        alt="Remy Sharp"
                        src={avatarSrc}
                        className={classes.avatar}
                    />
                </Badge>
                <form>
                    <input type="file" hidden={true} id="customFile" onChange={inputAddImgHandler} ref={wrapperRef} />
                    <CustomButton title="save" functionButton={addImgHandler} />

                </form>
            </div>
<MyPosts events={allEvents.myEventsPost} header={"my posts"} seterForEvents={setAllEvents} allEvents={allEvents}/>
<EventGroup events={allEvents.requstOnPending} header={"requst On Pending"}/>
<EventGroup events={allEvents.eventIHaveBeenIn} header={"event I Been In"}/>
        </div>
    )
}