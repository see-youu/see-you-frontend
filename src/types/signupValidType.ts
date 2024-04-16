export type ValidType = {
  username: boolean | null;
  nickname: boolean | null;
  password: boolean | null;
  confirmPassword: boolean | null;
  phoneNumber: boolean | null;
};

export type ValidationState = {
  username: { valid: boolean | null; message: string; loading: boolean };
  nickname: { valid: boolean | null; message: string; loading: boolean };
  password: { valid: boolean | null; message: string; loading: boolean };
  confirmPassword: { valid: boolean | null; message: string };
  phoneNumber: { valid: boolean | null; message: string };
  phoneCode: { valid: boolean | null; message: string };
};
