import * as React from 'react';
import { WithStyles } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import withRoot from '../containers/WithRoot';
import { IState } from '../reducers';
import { Dispatch, bindActionCreators, Action } from 'redux';
import { GetGitStatus } from './GitStatus';
import { connect } from 'react-redux';

let styles = require('./Home.scss');

export interface IHomePageProps extends RouteComponentProps<any> {
  GetGitStatus: () => void;
  gitStatus: string;
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class Home extends React.Component<WithStyles & IHomePageProps> {


  componentDidMount() {
  }

  render() {

    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <span>{this.props.gitStatus}</span>
          <button onClick={() => this.props.GetGitStatus()}>test</button>
        </div>
      </div >
    );
  }
}


function mapStateToProps(state: IState): Partial<IHomePageProps> {
  return {
    gitStatus: state.gitStatus,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action<IState>>): Partial<IHomePageProps> {
  return bindActionCreators({ GetGitStatus }, dispatch);
}


export default withRoot(Home);
