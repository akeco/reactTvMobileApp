import {
    ADD_SOCKET,
    ADD_USER,
    ADD_ANSWERS_STACK,
    ADD_TO_SCORE,
    MANAGE_JOKER,
    ADD_FIREBASE,
    INITIAL_JOKER_CALL,
    USED_JOKERS,
    INITIAL_USED_JOKERS
} from './events';

import {Platform} from 'react-native';

import axios from 'axios';
const SERVER_URL = __DEV__ ?
    Platform.select({
        ios: "http://localhost:3000",
        android: "http://10.0.3.2:3000"
    }) :
    "https://my-production-url.com";

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

export const addFirebase = data => {
    return ({
        type: ADD_FIREBASE,
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

export const initialJokerCall = payload => {
    return ({
        type: INITIAL_JOKER_CALL,
        payload
    });
};

export const initialUsedJokers = payload => {
    return ({
        type: INITIAL_USED_JOKERS,
        payload
    });
};

export const addToUsedJokers = payload => {
    return ({
        type: USED_JOKERS,
        payload
    });
};

export const manageJoker = (jokerNumb, userId) => {

    const request = axios.patch(`${SERVER_URL}/api/UserModels/${userId}`, {
        jokers: jokerNumb
    });

    console.info("REQ", request);

    return ({
        type: MANAGE_JOKER,
        payload: request
    });
};
