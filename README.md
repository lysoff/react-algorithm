# Algorithms in React Apps with `react-algorithm`

We often meet cases when we need to implement multistep scenario. Wizards, complex forms are typical cases when we think of some kind of algorithm that defines each-step-result-dependant behavour. You are completely lucky if you are using React (so am i). Let me introduce you to `react-algorithm` that will help you implement complex algorithms with ease.

## Install

```
$ npm install react-algorithm
```
or
```
$ yarn add react-algorithm
```

## Basic usage

### createAlgorithmContext

First, we should create context for our algorithm:
```typescript
// context.ts
import { createAlgorithmContext } from 'react-algorithm';

const { AlgorithmProvider, withAlgorithm } = createAlgorithmContext();
export { AlgorithmProvider, withAlgorithm };
```
NOTE: If we decide to use multiple algorithms in our app, we `createAlgorithmContext()` for each

### Concepts

Before we go to interesting JSX part, let's define terms:
- `algorithm` is the synchronous function which receives current step and result as params and returns next step(s) or null if there are no steps. It's intentionally synchronous. Consider algorithm as a skeleton of steps. Each step might be finished with different results. Result define which step(s) will be activated. All other logic and side effects are none of our business.
- 'step' - is the current state of algorithm, it might be represented with different components if needed.

So, let's create steps and algorithm function in separate file:
```typescript
// algorithm.ts
export const steps = {
  STEP1: 'STEP1',
  STEP2: 'STEP2',
  STEP3: 'STEP3',
}

export const algorithm = (stepToFinish: string, result: any) => {
    switch (stepToFinish) {
      case steps.STEP1:
        return steps.STEP2;
      case steps.STEP2:
        return steps.STEP3;
      default:
        return null;
    }
}
```

### AlgorithmProvider

`react-algorithm` uses `React.Context` under the hood and all steps should be within `<AlgorithmProvider />` that we created earlier. Let's render provider and pass `algorithm` function as a prop:

```typescript
// Container.tsx
import React from 'react';
import { steps, algorithm } from './algorithm';
import { AlgorithmProvider } from './context';

export default () => (
  <AlgorithmProvider
    initialStep={steps.STEP1}
    algorithm={algorithm}
  >
  ... // <-- steps are somewhere here
  </AlgorithmProvider>
);
```

NOTE: `initialStep` matters at first rendering only. It may be useful for different reasons. For example, you are able to resume your algorithm from any step if `initialStep` is passed from behind.

### withAlgorithm

Now, we are ready to create components that will be displayed during steps. HOC `withAlgorithm` connects a component to the algorithm through prop `finishStep` which is a function that receives result as a prop:
```typescript
// Steps.tsx
import React from 'react';
import { withAlgorithm } from './context';
import { steps } from './algorithm';

const Foo = ({ name, finishStep }) => (
  <div>
    {name}
    <button onClick={() => { finishStep(1); }}>Next</button>
  </div>
);

export const Component1 = withAlgorithm({
  name: 'Component1', // Custom prop
  step: steps.STEP1 // Component will be displayed on `steps.STEP1`
})(Foo);

export const Component2 = withAlgorithm({
  name: 'Component2',
  step: steps.STEP2
})(Foo);

export const Component3 = withAlgorithm({
  name: 'Component3',
  step: steps.STEP3
})(Foo);
```

### Beauty as it is

The resulting JSX will be like this:
```typescript
// Container.tsx
import React from 'react';
import { steps, algorithm } from './algorithm';
import { AlgorithmProvider } from './context';
import { Component1, Component2, Component3 } from './Steps';

export default () => (
  <AlgorithmProvider
    initialStep={steps.STEP1}
    algorithm={algorithm}
  >
    <Component1 />
    <Component2 />
    <Component3 />
  </AlgorithmProvider>
);
```
