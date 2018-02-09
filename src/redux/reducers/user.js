import { ADD_USER } from '../actions/events';

const user = (state = null, action) => {
    switch (action.type) {
        case ADD_USER:
            return action.data;
        default:
            return state;
    }
};

export default user;