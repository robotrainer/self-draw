import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import DrawingsService from './service/drawingsService';

function App() {
  const {store} = useContext(Context);
  const [drawings, setDrawings] = useState<any>([]);

  useEffect(() => {
    if(localStorage.getItem('auth')) {
      store.checkAuth();
    }
  }, []);

  const getDrawings = async () => {
    await DrawingsService.getAllDrawings().then((res) => {
      setDrawings(res.data);
    }).catch((error) => console.log(error.response.data.message));
  }

  if(store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <LoginForm />
    )
  }

  return (
    <div>
      <h2>User is logged in {store.user.login}</h2>
      <button onClick={()=> store.logout()}>Log out</button>
      <div>
        <button onClick={getDrawings}>Get Drawings</button>
      </div>
      {drawings.map((drawing: any) => 
        <div key={drawing.id}>
          <img src={drawing.url} alt=''/>
          <div>{drawing.title}</div>
          <div>{drawing.author.login}</div>
          <div>{drawing.likes}</div>
        </div>
      )}
    </div>
  );
}

export default observer(App);
