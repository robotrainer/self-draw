import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Logo from './components/UI/logo/Logo';
import TabBar from './components/UI/tabbar/TabBar';
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
      <Logo title='SelfDraw'/>
      <AppRouter />
      <TabBar />
    </BrowserRouter>
  );
}

export default observer(App);
