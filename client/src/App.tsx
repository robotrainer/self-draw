import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { Context } from './context';

function App() {
  const {store} = useContext(Context);

  useEffect(() => {
    if(localStorage.getItem('auth')) {
      store.checkAuth();
    }
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default observer(App);
