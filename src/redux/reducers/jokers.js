import {
    MANAGE_JOKER,
    INITIAL_JOKER_CALL
} from '../actions/events';

const jokers = (state = 0, action) => {
    switch (action.type) {
        case INITIAL_JOKER_CALL:
            return action.payload;
        case MANAGE_JOKER:
            return action.payload.data.jokers;
        default:
            return state;
    }
};

export default jokers;