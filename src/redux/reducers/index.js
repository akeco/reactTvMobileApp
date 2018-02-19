import { combineReducers } from 'redux';
import socket from './socket';
import user from './user';
import answersStack from './answersStack';
import score from './score';
import jokers from './jokers';
import firebase from './firebase';
import usedJokers from './usedJokers';

const reducers = combineReducers({
    socket,
    user,
    answersStack,
    score,
    jokers,
    firebase,
    usedJokers
});

export default reducers;