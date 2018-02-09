import { ADD_TO_SCORE } from '../actions/events';

const user = (state = 0, action) => {
    switch (action.type) {
        case ADD_TO_SCORE:
            return state + action.data;
        default:
            return state;
    }
};

export default user;