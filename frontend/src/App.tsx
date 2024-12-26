import { SnackbarProvider } from 'notistack';
import Shortener from './containers/Shortener/Shortener';

const App = () => {
  return (
    <SnackbarProvider autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} maxSnack={3}>
      <Shortener />
    </SnackbarProvider>
  );
};

export default App;
