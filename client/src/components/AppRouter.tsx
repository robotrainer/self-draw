import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Context } from '../context';
import Account from '../pages/Account';
import CreateDrawing from '../pages/CreateDrawing';
import Drawings from '../pages/Drawings';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SortedDrawings from '../pages/SortedDrawings';

const AppRouter: FC = () => {
  const {store} = useContext(Context);

  return (
    store.isAuth
    ?
    <Routes>
      <Route path='drawings' element={<Drawings />} />
      <Route path='sorted' element={<SortedDrawings />}/>
      <Route path='create' element={<CreateDrawing />} />
      <Route path='account' element={<Account />} />
      <Route path='*' element={<Drawings />} />
    </Routes>
    :
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />}/>
      <Route path='*' element={<Login />} />
    </Routes>
  )
}

export default observer(AppRouter);