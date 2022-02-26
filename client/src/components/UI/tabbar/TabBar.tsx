import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context';
import cl from './tabbar.module.css';

const TabBar: FC= () => {
  const {store} = useContext(Context);
  const navigate = useNavigate();
  
  return (
  <div className={cl.tabBar}>
    <button onClick={() => navigate('/drawing')}>Новые</button>
    <button onClick={() => navigate('/sorted')}>Популярные</button>
    <button onClick={() => store.logout()}>Log Out</button>
  </div>
  )
}

export default observer(TabBar);