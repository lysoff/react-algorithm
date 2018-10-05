import React from 'react';
import { AlgorithmContext } from './types';

type Props = {
  steps: { [key: string]: string };
  initialStep: string;
  algorithm: (step: string, result: any) => string | string[];
};

type State = {
  steps: { [key: string]: string };
  currentSteps: string[];
};

export default (context: React.Context<AlgorithmContext>) => {
  return class AlgorithmProvider extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        steps: props.steps,
        currentSteps: [props.initialStep]
      }
    }

    public finishStep = (step: string, result: any, onStepFinished?: any) => {
      const index = this.state.currentSteps.indexOf(step);
      if (index === -1) {
        return;
      }

      const stepsToAppend = this.props.algorithm(step, result)
      let currentSteps = [...this.state.currentSteps];

      currentSteps = currentSteps.concat(stepsToAppend);
      currentSteps.splice(index, 1);

      this.setState({
        currentSteps
      });

      onStepFinished && onStepFinished(result);
    }

    public render() {
      const { currentSteps } = this.state;

      return (
        <context.Provider value={{
          currentSteps,
          finishStep: this.finishStep
        }}>
          {this.props.children}
        </context.Provider>
      );
    }
  }
}
