import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Alert } from 'react-bootstrap';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const AlertContext = createContext({
  alert: (message: string, variant: 'success' | 'danger') => {},
});

const AlertApi = ({ children }: { children: React.ReactNode }) => {
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
      <Navbar />
      <main className='container'>
        <Alert
          show={show}
          variant={variant}
          onClose={() => setShow(false)}
          className='mb-3'
          dismissible
        >
          {message}
        </Alert>
        {children}
      </main>
      <Footer />
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);

export default AlertApi;
