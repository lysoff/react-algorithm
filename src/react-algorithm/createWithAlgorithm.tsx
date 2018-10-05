import React from 'react';
import { AlgorithmContext } from './types';

type HOCProps = {
  name: string;
  step: string;
};

type WrappedComponentProps = {
  onStepFinished: any;
};

export default (context: React.Context<AlgorithmContext>) => ({
  name,
  step
}: HOCProps) => (WrapperComponent: any) => ({
  onStepFinished,
  ...props
}: WrappedComponentProps) => {
  return (
    <context.Consumer>
      {({ finishStep, currentSteps }: AlgorithmContext) => {
        if (currentSteps.indexOf(step) === -1) {
          return null;
        }

        const finishStepFunction = (result: any) => finishStep(step, result, onStepFinished);

        return (
          <WrapperComponent
            name={name}
            currentSteps={currentSteps}
            finishStep={finishStepFunction}
            {...props}
          />
        );
      }}
    </context.Consumer>
  );
};
