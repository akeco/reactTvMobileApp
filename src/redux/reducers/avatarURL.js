import { ADD_AVATAR_URL } from '../actions/events';

const avatarURL = (state = null, action) => {
    switch (action.type) {
        case ADD_AVATAR_URL:
            return action.payload;
        default:
            return state;
    }
};

export default avatarURL;