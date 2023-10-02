export const nameValidators = [
  (val: string) => val.length > 1 || 'Minimum 2 characters',
  (val: string) => /^(?=.*[a-zA-Z])/.test(val) || 'Only from a-A to z-Z',
];

export const validateName = (name: string) => {
  const isValid = false;
  nameValidators.forEach((validator) => {
    const res = validator(name);
  });
};
