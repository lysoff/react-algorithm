# React Algorithm 

Implement complex algorithms with ease

### Install

```
npm install react-algorithm
```
or
```
yarn add react-algorithm
```

### Basic usage

First, we should create context for our algorithm:
```typescript
// context.ts
import { createAlgorithmContext } from 'react-algorithm';

const { AlgorithmProvider, withAlgorithm } = createAlgorithmContext();
export { AlgorithmProvider, withAlgorithm };
```
NOTE: If we decided to use multiple algorithms in our app, we `createAlgorithmContext()` for each

Before we go to interesting JSX part, let's define terms:
- `algorithm` is the synchronous function which gets current step and result as params and returns next step(s) or null if there are no steps. It's intentionally synchronous. Consider algorithm as a skeleton of steps. Each step might be finished with different results. Result define which step(s) will be activated.
- 'step' - is the current state of algorithm, it might be represented with different components if needed

So, let's create steps and algorithm function in separate file:
```typescript
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

`react-algorithm` uses `React.Context` and all steps should be within `<AlgorithmProvider />` that we created earlier. Let's render provider and pass it our algorithm function:

```typescript
// Container.tsx
import React from 'react';
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

Now, we are ready to create components that will be displayed during steps. HOC `withAlgorithm` connects a component to the algorithm through prop `finishStep` which is a function that receives result as prop:
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
  step: steps.STEP1 // Component will be displayed on
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

### AlgorithmProvider

React.Component with React.Context<> under the hood.
