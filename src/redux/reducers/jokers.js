import {
    MANAGE_JOKER
} from '../actions/events';

const user = (state = 5, action) => {
    switch (action.type) {
        case MANAGE_JOKER:
            if(!action.data && state != 0) return state - 1;
            else return state + 1;
        default:
            return state;
    }
};

export default user;