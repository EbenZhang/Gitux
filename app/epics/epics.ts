import { gitStatusEpic } from '../home/GitStatus';
import { combineEpics } from 'redux-observable';

const epics = combineEpics(gitStatusEpic);
export default epics;


