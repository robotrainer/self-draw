import React, { FC } from 'react';
import cl from './logo.module.css'

interface LogoProps {
  title: string;
}

const Logo: FC<LogoProps> = ({title}: LogoProps) => {
  return (
    <h2 className={cl.logo}>{title}</h2>
  )
}

export default Logo