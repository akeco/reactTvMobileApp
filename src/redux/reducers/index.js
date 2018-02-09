import { combineReducers } from 'redux';
import socket from './socket';
import user from './user';
import answersStack from './answersStack';
import score from './score';
import jokers from './jokers';

const reducers = combineReducers({
    socket,
    user,
    answersStack,
    score,
    jokers
});

export default reducers;