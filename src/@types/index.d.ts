type Alert = {
  message: string;
  variant: 'success' | 'danger';
};

type AppError = {
  message: string;
  details: ErrorDetails;
  link?: {
    url: string;
    text: string;
  };
};
