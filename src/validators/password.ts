export const passwordValidators = [
  (val: string) => (val && val.length > 8) || 'Minimum 8 characters',
  (val: string) => /^(?=.*[0-9])/.test(val) || 'Minimum 1 digit',
  (val: string) => /^(?=.*[A-Z])/.test(val) || 'Minimum 1 large letter',
  (val: string) => /^[a-zA-Z0-9!@#$%^&_*]+$/.test(val) || 'Only from a-A to z-Z',
  (val: string) => /^(?=.*[!@#$%^&_*])/.test(val) || 'Minimum 1 special character',
  (val: string) => (
    !(val === 'mrCmTF%Lz^Y*k#o@prjL2O') || 'You cannot give the password from the example'
  ),
];
