import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetailsAction, chatAccessAction } from '../redux/actions'
import { useHistory } from 'react-router-dom';
import ChatModal from '../customComponents/chatModal'



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        alignItems: 'center'
    }
}));


export default function UserProfileScreen({ location }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [chat, setChat] = useState(false)
    const [ open, setOpen ] = React.useState(false);
    const userDetails = useSelector(state => state.userDetails)

    useEffect(() => {
        const { userId } = queryString.parse(location.search);
        dispatch(getUserDetailsAction(userId))
        const getAccessChat = async () => {
            const access = await dispatch(chatAccessAction(userId))
            setChat(access)
        }
        getAccessChat()
    });


    const classes = useStyles();
    return (
        <div>
            <div className={classes.avatar}>
                <Avatar alt="Remy Sharp" src="https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=ji6Xj8tv"  />
            </div>
            <div>
                <h2>{userDetails.user_name}</h2>
            </div>
            {!chat ? null : <button onClick={() => {  }}>chat </button>}
            {/* <button
            onClick={()=>{
                setOpen(true);
            }}
            ></button> */}
			
			<ChatModal isOpen={open} seter={setOpen} />
        </div>
    )

}