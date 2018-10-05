import React from 'react'
import createAlgorithmProvider from './createAlgorithmProvider';
import createWithAlgorithm from './createWithAlgorithm';
import { AlgorithmContext } from './types';

export default () => {
  const context = React.createContext({} as AlgorithmContext);

  return {
    AlgorithmProvider: createAlgorithmProvider(context),
    withAlgorithm: createWithAlgorithm(context)
  }
}