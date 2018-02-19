import {
    USED_JOKERS,
    INITIAL_USED_JOKERS
} from '../actions/events';

const usedJokers = (state = null, action) => {
    switch (action.type) {
        case INITIAL_USED_JOKERS:
            return action.payload;
        case USED_JOKERS:
            return state - 1;
        default:
            return state;
    }
};

export default usedJokers;