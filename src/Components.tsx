import React from 'react';
import { withAlgorithm } from './context';
import { steps } from './algorithm';

// tslint:disable:jsx-no-lambda
const Dumb = ({ name, finishStep }) => (
  <div>
    {name}
    <button onClick={() => { finishStep(1); }}>Next</button>
  </div>
);
// tslint:enable:jsx-no-lambda

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
