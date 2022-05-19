export type TFormError = {
  type: string;
  message: string;
  transloco: string;
  length?: number;
};

export type TValidationError = {
  [key: string]: TFormError[];
};
