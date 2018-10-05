import React from 'react';
import { AlgorithmContext } from './types';

type HOCProps = {
  step?: string;
  [key: string]: any;
};

type FinisherProps = {
  result: any;
  finishStep: any;
};

type FinisherWrapperProps = {
  result: any;
};

export type WrappedComponentProps = {
  isCurrentStep: boolean;
  currentStep: string | undefined;
  finishStep: any;
  step: string | undefined;
  Finisher: React.SFC<FinisherWrapperProps>;
};

class FinisherComponent extends React.Component<FinisherProps> {
  public render() {
    return null;
  }

  public componentDidMount() {
    const { finishStep, result } = this.props;

    finishStep(result);
  }
}

export default (context: React.Context<AlgorithmContext>) => <T extends any>(
  { step, ...hocProps }: HOCProps = { step: undefined }
) => (
  WrapperComponent: React.ComponentClass<WrappedComponentProps> | React.SFC<WrappedComponentProps>
) => (props: T) => {
  return (
    <context.Consumer>
      {({ finishStep, currentStep }: AlgorithmContext) => {
        const isCurrentStep = currentStep === step;

        const finishStepFunction = (result: any) => {
          if (!step || isCurrentStep) {
            finishStep(currentStep, result);
          }
        };

        const Finisher = ({ result }: FinisherWrapperProps) => (
          <FinisherComponent result={result} finishStep={finishStepFunction} />
        );

        return (
          <WrapperComponent
            isCurrentStep={isCurrentStep}
            currentStep={currentStep}
            finishStep={finishStepFunction}
            Finisher={Finisher}
            step={step}
            {...props}
            {...hocProps}
          />
        );
      }}
    </context.Consumer>
  );
};
