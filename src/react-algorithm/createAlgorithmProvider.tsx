import React from 'react';
import { AlgorithmContext } from './types';

type Props = {
  initialStep: string;
  algorithm: (step: string, result: any) => string | undefined;
};

type State = {
  currentStep: string | undefined;
};

export default (context: React.Context<AlgorithmContext>) => {
  return class AlgorithmProvider extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        currentStep: props.initialStep
      };
    }

    public finishStep = (step: string, result: any) => {
      const currentStep = this.props.algorithm(step, result);

      this.setState({
        currentStep
      });
    };

    public render() {
      const { currentStep } = this.state;

      return (
        <context.Provider
          value={{
            currentStep,
            finishStep: this.finishStep
          }}
        >
          {this.props.children}
        </context.Provider>
      );
    }
  };
};
