export const emailValidators = [
  (val: string) => (
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(val) || 'No valid phone number'
  ),
];
