export const phoneNumberValidators = [
  (val: string) => /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/.test(val) || 'No valid phone number',
];
