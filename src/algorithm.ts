export const steps = {
  STEP1: 'STEP1',
  STEP2: 'STEP2',
  STEP3: 'STEP3',
}

export const algorithm = (stepToFinish: string, result: any) => {
  return new Promise((resolve, reject) => {
    switch (stepToFinish) {
      case steps.STEP1:
        setTimeout(() => resolve(steps.STEP2), 1000);
        break;
      case steps.STEP2:
        setTimeout(() => resolve(steps.STEP3), 1000);
        break;
      default:
        setTimeout(() => resolve(null), 1000);
    }
  });
}


