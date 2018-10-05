import React from 'react';
import { withAlgorithm } from './context';
import { steps } from './algorithm';
import { WrappedComponentProps } from './react-algorithm/createWithAlgorithm';

type Props = {
  name: string;
};
// tslint:disable:jsx-no-lambda
const Dumb = ({ name, finishStep, isCurrentStep }: WrappedComponentProps & Props) => (
  <div>
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

export const Component1 = withAlgorithm({
  name: 'Component1',
  step: steps.STEP1
})(Dumb);

export const Component2 = withAlgorithm({
  name: 'Component2',
  step: steps.STEP2
})(Dumb);

export const Component3 = withAlgorithm({
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

// tslint:enable:jsx-no-lambda
