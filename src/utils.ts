export const dataFromInput = <T>(form: HTMLFormElement): T =>
  Object.fromEntries(new FormData(form)) as unknown as T;

export const handleValidation = (
  e: React.FormEvent<HTMLFormElement>
): boolean => {
  e.preventDefault();
  e.stopPropagation();
  if (!e.currentTarget.checkValidity()) {
    e.currentTarget.classList.add('was-validated');
    return false;
  }
  return true;
};

export const isAppError = (data: any): data is AppError => {
  return 'message' in data && 'status' in data && 'details' in data;
};
