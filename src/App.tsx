import React from 'react';
import { Component1, Component2, Component3, Footer, Button } from './Components';
import { steps, algorithm } from './algorithm';
import { AlgorithmProvider } from './context';

type State = {
  a: number;
  b: number;
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
        <AlgorithmProvider initialStep={steps.STEP1} algorithm={algorithm}>
          <Component1 shouldFinishStep={a === 7} />
          <Component2 shouldFinishStep={b === 7} />
          <Component3 shouldFinishStep={c === 7} />
          <Footer />
          <Button onClick={() => this.onChange({ a: 7 })}>Finish 1</Button>
          <Button onClick={() => this.onChange({ b: 7 })}>Finish 2</Button>
          <Button onClick={() => this.onChange({ c: 7 })}>Finish 3</Button>
          <div>{a}</div>
          <div>{b}</div>
          <div>{c}</div>
        </AlgorithmProvider>
      </div>
    );
  }
  // tslint:enable:jsx-no-lambda
}
