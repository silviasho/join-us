import Actions from './action.config';
import mainAxios from '../utils/main.axios'

export const setUser = (user) => {
    return {
        type: Actions.SAVE_USER,
        payload: user
    };
};

export const setsEvents = (events) => {
    return {
        type: Actions.GET_EVENTS,
        payload: events
    };
};


export const setEventsRelatedToMe = (events) => {
    return {
        type: Actions.EVENTS_RELATED_TO_ME,
        payload: events
    };
};


export const setUserDetails = (user) => {
    return {
        type: Actions.GET_USER_DETAILS,
        payload: user
    };
}

export const cleareState = () => {
    return {
        type: Actions.CLEARE_STATE
    };
}

export const getUserDetailsAction = (userId) => async (dispatch) => {
    try {
        const res = await mainAxios.get(`/registration/userDetails/${userId}`)
        dispatch(setUserDetails(res.data))
    } catch (error) {
        return error
    }
}

export const requestToJoinAction = (event) => async () => {
    try {
        await mainAxios.post('/events/requestToJoin', { event })
    } catch (error) {
        return error
    }
}

export const chatAccessAction = (userId) => async () => {
    try {
        const res = await mainAxios.get(`/events/chatAccess/${userId}`)
        return res.data.chatAccess
    } catch (error) {
        return error
    }
}

export const saveUserAction = (user) => async (dispatch) => {
    try {
        const res = await mainAxios.post('/registration/saveUser', user)
        const { token } = res.data
        if (!token) return res.data.err
        localStorage.setItem('token', token);
        console.log(res.data.user)
        dispatch(setUser(res.data.user))
    } catch (error) {
        return error
    }
}

export const loginAction = (item) => async (dispatch) => {
    try {
        const result = await mainAxios.post('/registration/login', item);
        dispatch(setUser(result.data.user))
        const { err, token } = result.data
        if (err) alert(err)
        else {
            localStorage.setItem('token', token)
            return true
        }
    } catch (error) {
        return false;
    }
};

export const addEventAction = (events, tagPeople, file, privacy) => async (dispatch) => {
    try {
console.log(events, tagPeople, file, privacy)
        const res = await mainAxios.post('/events/addEvent', { event: events, tagPeople: tagPeople, img: file, private: privacy })

        dispatch(setsEvents(res.data.events))
    } catch (error) {
        return error
    }
}

export const getEventAction = () => async (dispatch) => {
    try {
        const res = await mainAxios.get(`/events/getEvent`)
        dispatch(setsEvents(res.data.events))
    } catch (error) {
        return error
    }
}

export const sandFiltersToServer = (filter) => async (dispatch) => {
    try {
        const res = await mainAxios.post('/events/getEventsFilter', filter)
        dispatch(setsEvents(res.data.events))
        return res.data.events
    } catch (error) {
        return error
    }
}



export const getMyEventAction = () => async (dispatch) => {
    try {
        const res = await mainAxios.get(`/events/myEvent`)
        dispatch(setEventsRelatedToMe(res.data))
        return res.data
    } catch (error) {
        return error
    }
}


export const updateProfilePicAction = (item) => async () => {
    try {
        await mainAxios.post(`/pics/upload`, item, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        return error;
    }
};



export const ignoreUser = (userId,eventId) => async () => {
    try {
      const res=  await mainAxios.post(`/events/ignoreUser`,{userId,eventId})
return res.data
    } catch (error) {
        return error;
    }
};

export const approveUser = (userId,eventId) => async () => {
    try {
      const res=  await mainAxios.post(`/events/approveUser`,{userId,eventId})
return res.data
    } catch (error) {
        return error;
    }
};

export const getUserProfilePath = () => async () => {
    try {
      const res=  await mainAxios.get(`/pics/userProfileFileName`)
      return res.data
    } catch (error) {
        return error;
    }
};



export const getUsersOnPenndingDetailsAction = (usersArray) => async (dispatch) => {
    try {

        const res = await mainAxios.post(`/events/usersDetails`,usersArray)
     return res.data
    } catch (error) {
        return error
    }
}