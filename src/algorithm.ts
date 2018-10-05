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


