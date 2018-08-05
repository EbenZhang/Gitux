import { Dispatch } from 'redux';
import { actionCreator, IAction } from '../actions/helpers';
import { IState } from '../reducers';
import { GitProcess } from 'dugite';
import * as path from 'path';
const which = require('which');

const GetGitStatusAction = actionCreator<string>('GET_GIT_STATUS');

export function GetGitStatus() {

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

  return async (dispatch: Dispatch<IState>, getState: () => IState) => {
    const status = await getCurStatus();
    dispatch(GetGitStatusAction(status));
  };
}

export function gitStatus(state: string = "", action: IAction): string {
  if (GetGitStatusAction.test(action)) {
    return action.payload;
  } else {
    return state;
  }
}

