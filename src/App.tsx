import React from 'react';
import { Component1, Component2, Component3, Footer } from './Components';
import { steps, algorithm } from './algorithm';
import { AlgorithmProvider } from './context';

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
          initialStep={steps.STEP1}
          algorithm={algorithm}
        >
          <Component1 />
          <Component2 />
          <Component3 />
          <Footer />
        </AlgorithmProvider>
      </div>
    );
  }
  // tslint:enable:jsx-no-lambda
}
