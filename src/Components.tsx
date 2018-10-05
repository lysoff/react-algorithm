import React from 'react';
import { withAlgorithm } from './algorithmContext';
import { steps } from './algorithm';

// tslint:disable:jsx-no-lambda
const Dumb = ({ name, finishStep, isFinishing }) => (
  <div>
    {name}
    <button
      onClick={() => {
        finishStep(1);
      }}
      disabled={isFinishing}
    >
      {!isFinishing ? 'Next' : 'Loading...'}
    </button>
  </div>
);
// tslint:enable:jsx-no-lambda

export const ComponentA = withAlgorithm({
  name: 'ComponentA',
  step: steps.STEP1
})(Dumb);

export const ComponentB = withAlgorithm({
  name: 'ComponentB',
  step: steps.STEP2
})(Dumb);

export const ComponentC = withAlgorithm({
  name: 'ComponentC',
  step: steps.STEP3
})(Dumb);
