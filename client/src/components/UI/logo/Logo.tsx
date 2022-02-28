import React, { FC } from 'react';
import cl from './logo.module.css'

interface LogoProps {
  title: string;
}

const Logo: FC<LogoProps> = ({title}) => {
  return (
    <h2 className={cl.logo}>{title}</h2>
  )
}

export default Logo