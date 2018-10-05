import React from 'react';
import { ComponentA, ComponentB, ComponentC } from './Components';
import { steps, algorithm } from './algorithm';
import { AlgorithmProvider } from './algorithmContext';
// import { Footer } from './Footer';

type State = {
  a: number,
  b: number,
  c: number;
};

export default class App extends React.Component<{}, State> {
  public state = {
    a: 0,
    b: 0,
    c: 0
  };

  private onChange = val => {
    this.setState(val);
  };

  // tslint:disable:jsx-no-lambda
  public render() {
    const { a, b, c } = this.state;
    return (
      <div>
        <AlgorithmProvider
          steps={steps}
          initialStep={steps.STEP1}
          algorithm={algorithm}
        >
          <div>{a}</div>
          <div>{b}</div>
          <div>{c}</div>
          <ComponentA onStepFinished={() => this.onChange({ a: 7 })} />
          <ComponentB onStepFinished={() => this.onChange({ b: 7 })} />
          <ComponentC onStepFinished={() => this.onChange({ c: 7 })} />
        </AlgorithmProvider>
      </div>
    );
  }
  // tslint:enable:jsx-no-lambda
}
