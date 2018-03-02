import { ADD_REGISTER_DETAILS } from '../actions/events';

const registerDetails = (state = null, action) => {
    switch (action.type) {
        case ADD_REGISTER_DETAILS:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default registerDetails;