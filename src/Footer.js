import React from 'react';
import { withAlgorithm } from './algorithmContext';
import { steps } from './algorithm';

export const Footer = withAlgorithm({
  name: "Footer",
  step: [steps.STEP3, steps.STEP1, steps.STEP2],
})(({ currentSteps, finishStep }) => (
  <div>
    {`Current step is "${currentSteps.join('')}"`}
    <button onClick={() => finishStep(1)}>Next</button>
  </div>
));