type validatorFunction = (val: string) => boolean | string;

export const stringValidator = (val: string, validators: validatorFunction[]): boolean => {
  let res = true;
  validators.forEach((validator) => {
    const isValid = validator(val);

    if (typeof isValid === 'string') {
      res = false;
    } else if (!isValid) {
      res = false;
    }
  });

  return res;
};
