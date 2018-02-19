import {
    ADD_SOCKET,
} from '../actions/events';

const socket = (state = null, action) => {
    switch (action.type) {
        case ADD_SOCKET:
            return action.data;
        default:
            return state;
    }
};

export default socket;