import {
    ADD_SOCKET,
    ADD_USER,
    ADD_ANSWERS_STACK,
    ADD_TO_SCORE,
    MANAGE_JOKER
} from './events';

export const addSocket = data => {
    return ({
        type: ADD_SOCKET,
        data
    });
};

export const addUser = data => {
    return ({
        type: ADD_USER,
        data
    });
};

export const addAnswersStack = data => {
    return ({
        type: ADD_ANSWERS_STACK,
        data
    });
};

export const addToScore = data => {
    return ({
        type: ADD_TO_SCORE,
        data
    });
};

export const manageJoker = data => {
    return ({
        type: MANAGE_JOKER,
        data
    });
};
