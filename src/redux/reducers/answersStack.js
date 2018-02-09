import { ADD_ANSWERS_STACK } from '../actions/events';

const answersStack = (state = [], action) => {
    switch (action.type) {
        case ADD_ANSWERS_STACK:
            return [...state, action.data];
        default:
            return state;
    }
};

export default answersStack;