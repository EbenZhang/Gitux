import { Dispatch, Action } from 'redux';
import { actionCreator, IAction, actionCreatorVoid } from '../actions/helpers';
import { IState } from '../reducers';
import { GitProcess } from 'dugite';
import * as path from 'path';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';
const which = require('which');

const StartGetGitStatusAction = actionCreatorVoid('START_GET_GIT_STATUS');
const FinishedGetGitStatusAction = actionCreator<string>('FINISHED_GET_GIT_STATUS');

async function getCurStatus(): Promise<string> {
  const gitPath = which.sync("git");
  console.log(`gitPath ${gitPath}`);
  process.env.LOCAL_GIT_DIRECTORY = path.resolve(path.dirname(gitPath), '..', '..');
  const curDir = path.resolve(".");
  console.log(`curdir: ${curDir}`);
  const result = await GitProcess.exec(['status'], curDir);
  let output = "";
  if (result.exitCode === 0) {
    output = result.stdout
    // do some things with the output
  } else {
    output = result.stderr
    // error handling
  }
  console.log(`output ${output}`);
  return output;
}

export function GetGitStatus() {
  return async (dispatch: Dispatch<Action<IState>>, getState: () => IState) => {
    console.log("dispatching ping");
    dispatch(StartGetGitStatusAction());
  };
}

// reducer
export function gitStatus(state: string = "", action: IAction): string {
  if (FinishedGetGitStatusAction.test(action)) {
    return action.payload;
  } else {
    return state;
  }
}

// epic
export function gitStatusEpic(action$: ActionsObservable<Action>): Observable<Action> {
  return action$.ofType(StartGetGitStatusAction().type).pipe(switchMap(() => {
    return getCurStatus().then(x => FinishedGetGitStatusAction(x));
  }));
}
