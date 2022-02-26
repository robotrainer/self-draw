import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../context';

const Login: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {store} = useContext(Context)

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
    <button onClick={() => store.login(login, password)}>Log In</button>
    <Link to='/register'>Creat an account</Link>
  </div>
  )
}

export default observer(Login);