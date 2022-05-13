export type TFormError = {
  type: string;
  message: string;
};

export type TValidationError = {
  [key: string]: TFormError[];
};
