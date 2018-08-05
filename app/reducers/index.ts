import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { gitStatus } from '../home/GitStatus';

const rootReducer = combineReducers({
  routing: routing as Reducer<any>,
  gitStatus,
});

export interface IState {
  gitStatus: string;
}

export default rootReducer;
