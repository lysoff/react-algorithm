import React from 'react';
import { withAlgorithm } from './context';
import { steps } from './algorithm';
import { WrappedComponentProps } from './react-algorithm/createWithAlgorithm';

type Props = {
  shouldFinishStep: boolean;
};

type OptionProps = {
  name: boolean;
};

// tslint:disable:jsx-no-lambda
const Dumb = ({
  name,
  finishStep,
  isCurrentStep,
  shouldFinishStep,
  Finisher
}: WrappedComponentProps & Props & OptionProps) => (
  <div>
    {shouldFinishStep && <Finisher result={1} />}
    {name}
    <button
      disabled={!isCurrentStep}
      onClick={() => {
        finishStep(1);
      }}
    >
      Next
    </button>
  </div>
);

export const Component1 = withAlgorithm<Props>({
  name: 'Component1',
  step: steps.STEP1
})(Dumb);

export const Component2 = withAlgorithm<Props>({
  name: 'Component2',
  step: steps.STEP2
})(Dumb);

export const Component3 = withAlgorithm<Props>({
  name: 'Component3',
  step: steps.STEP3
})(Dumb);

export const Footer = withAlgorithm()(({ currentStep, finishStep }) => (
  <React.Fragment>
    {currentStep}
    {!!currentStep && (
      <button
        onClick={() => {
          finishStep(1);
        }}
      >
        Next
      </button>
    )}
  </React.Fragment>
));

export const Button = ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>;

// tslint:enable:jsx-no-lambda
