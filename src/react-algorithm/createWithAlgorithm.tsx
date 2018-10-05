import React from 'react';
import { AlgorithmContext } from './types';

type HOCProps = {
  step?: string;
  [key: string]: any;
};

export type WrappedComponentProps = {
  isCurrentStep: boolean;
  currentStep: string | undefined;
  finishStep: any;
  step: string | undefined;
};

export default (context: React.Context<AlgorithmContext>) => (
  { step, ...hocProps }: HOCProps = { step: undefined }
) => (WrapperComponent: React.ComponentClass<WrappedComponentProps> | React.SFC<WrappedComponentProps>) => () => {
  return (
    <context.Consumer>
      {({ finishStep, currentStep }: AlgorithmContext) => {
        const isCurrentStep = currentStep === step;

        const finishStepFunction = (result: any) => {
          if (!step || isCurrentStep) {
            finishStep(currentStep, result);
          }
        };

        return (
          <WrapperComponent
            isCurrentStep={isCurrentStep}
            currentStep={currentStep}
            finishStep={finishStepFunction}
            step={step}
            {...hocProps}
          />
        );
      }}
    </context.Consumer>
  );
};
