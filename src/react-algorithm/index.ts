import React from 'react'
import createAlgorithmProvider from './createAlgorithmProvider';
import createWithAlgorithm from './createWithAlgorithm';
import { AlgorithmContext } from './types';

export const createAlgorithmContext = () => {
  const context = React.createContext({} as AlgorithmContext);

  return {
    Algorithm: createAlgorithmProvider(context),
    withAlgorithm: createWithAlgorithm(context)
  }
}