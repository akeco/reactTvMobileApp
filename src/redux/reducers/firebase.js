import { ADD_FIREBASE } from '../actions/events';

const firebase = (state = null, action) => {
    switch (action.type) {
        case ADD_FIREBASE:
            return action.data;
        default:
            return state;
    }
};

export default firebase;