import day from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const dataFromInput = <T>(form: HTMLFormElement): T =>
  Object.fromEntries(new FormData(form)) as unknown as T;

const handleValidation = (e: React.FormEvent<HTMLFormElement>): boolean => {
  e.preventDefault();
  e.stopPropagation();
  if (!e.currentTarget.checkValidity()) {
    e.currentTarget.classList.add('was-validated');
    return false;
  }
  return true;
};

const isAppError = (data: any): data is AppError => {
  return 'message' in data && 'details' in data;
};

const fromDate = (date: string) => {
  day.extend(relativeTime);
  return day(date).fromNow();
};

export { dataFromInput, handleValidation, isAppError, fromDate };
