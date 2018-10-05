import React from 'react';
import { AlgorithmContext } from './types';

type Props = {
  steps: string[];
  initialStep: string;
  algorithm: (step: string, result: any) => Promise<string | string[]>;
};

type State = {
  steps: string[];
  currentSteps: string[];
  isFinishing: boolean;
};

export default (context: React.Context<AlgorithmContext>) => {
  return class AlgorithmProvider extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        steps: props.steps,
        currentSteps: [props.initialStep],
        isFinishing: false,
      }
    }

    public finishStep = (step: string, result: any, onStepFinished?: any) => {
      const index = this.state.currentSteps.indexOf(step);
      if (index === -1) {
        return;
      }

      this.props.algorithm(step, result).then(stepsToAppend => {
        let currentSteps = [...this.state.currentSteps];

        currentSteps = currentSteps.concat(stepsToAppend);
        currentSteps.splice(index, 1);

        this.setState({
          currentSteps,
          isFinishing: false
        });

        onStepFinished && onStepFinished(result);
      });

      this.setState({
        isFinishing: true
      });
    }

    public render() {
      const { currentSteps, isFinishing } = this.state;

      return (
        <context.Provider value={{
          currentSteps,
          isFinishing,
          finishStep: this.finishStep
        }}>
          {this.props.children}
        </context.Provider>
      );
    }
  }
}
