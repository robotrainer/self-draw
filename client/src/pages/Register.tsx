import React, { FC, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../context';

const Register: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {store} = useContext(Context);
  const navigate = useNavigate();

  return (
    <div>
    <input
      onChange={(e) => setLogin(e.target.value)}
      value={login}
      type='text'
      placeholder='Login'
    />
     <input
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      type='password'
      placeholder='Password'
    />
    <button
      onClick={() => {
        store.register(login, password);
        navigate('/login');
      }}
    >
      Sign Up
    </button>
  </div>
  )
}

export default Register