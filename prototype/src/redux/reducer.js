import Actions from './action.config';

const initialState = {
    user: {},
    events: [],
    userDetails: {},
    EventsRelatedToMe: {},

};


export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case Actions.SAVE_USER:
            return { ...state, user: payload };
        case Actions.ADD_EVENT:
            return { ...state, events: payload };
        case Actions.GET_EVENTS:
            return { ...state, events: payload };
        case Actions.GET_USER_DETAILS:
            return { ...state, userDetails: payload };
        case Actions.FILTER_EVENTS:
            return { ...state, events: payload };
        case Actions.CLEARE_STATE:
            return { ...state }
        case Actions.EVENTS_RELATED_TO_ME:
            return { ...state, EventsRelatedToMe: payload };




        default:
            return state;
    }
};