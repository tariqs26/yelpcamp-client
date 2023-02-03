import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Alert } from 'react-bootstrap';
import './styles.css';

const AlertContext = createContext({
  alert: (message: string, variant: 'success' | 'danger') => {},
});

export default function AlertApi({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');
  const [timeSent, setTimeSent] = useState(0);

  const alert = useCallback(
    (message: string, variant: 'success' | 'danger') => {
      setMessage(message);
      setVariant(variant);
      setTimeSent(new Date().getTime());
      setShow(true);
    },
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [timeSent]);

  return (
    <AlertContext.Provider value={{ alert }}>
      <Alert
        show={show}
        variant={variant}
        onClose={() => setShow(false)}
        className='position-absolute'
        dismissible
        style={{
          zIndex: 1,
          top: '4.5rem',
          right: '1rem',
          animation: 'AlertDrop 200ms ease-in-out',
        }}
      >
        {message}
      </Alert>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
