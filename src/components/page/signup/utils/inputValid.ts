export const isIdValid = (value: string): boolean => {
  if (value.length < 5 || value.length > 12) {
    return false;
  }

  const pattern = /^[a-z0-9]+$/;
  return pattern.test(value);
};

export const isPasswordValid = (value: string): boolean => {
  if (value.length < 8 || value.length > 16) {
    return false;
  }

  const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])/;
  return regex.test(value);
};

export const arePasswordsMatched = (value: string, confirmValue: string): boolean => {
  return value === confirmValue;
};

export const isNicknameValid = (value: string): boolean => {
  const minLength = 2;
  const maxLength = 12;
  const regex = /^[a-zA-Z0-9]*$/;

  if (value.length >= minLength && value.length <= maxLength && regex.test(value)) {
    return true;
  }

  return false;
};

export const isInterestListValid = (value: number): boolean => {
  if (value === 3) {
    return true;
  }

  return false;
};
