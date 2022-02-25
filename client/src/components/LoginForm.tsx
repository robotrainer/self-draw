import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react'
import { Context } from '..';

const LoginForm: FC = () => {
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
      <button onClick={() => store.register(login, password)}>Creat an account</button>
    </div>
  )
}

export default observer(LoginForm);