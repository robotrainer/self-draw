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
    <button onClick={() => navigate('/drawing')}>New</button>
    <button onClick={() => navigate('/sorted')}>Popular</button>
    <button onClick={() => navigate('/create')}>Create</button>
    <button onClick={() => store.logout()}>Log Out</button>
  </div>
  )
}

export default observer(TabBar);