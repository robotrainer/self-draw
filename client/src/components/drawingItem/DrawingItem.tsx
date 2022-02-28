import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { DrawingResponse } from '../../models/response/DrawingResponse';
import cl from './drawingitem.module.css'

interface DrawingProps {
  drawing: DrawingResponse;
}

const DrawingItem: FC<DrawingProps> = ({drawing}) => {
  return (
    <div className={cl.drawingItem}>
      <img src={drawing.url} alt=''/>
      <div className={cl.caption}>
        <div className={cl.captionInfo}>
          <h3>{drawing.title}</h3>
          <h3>{drawing.author.login}</h3>
          <h3>{drawing.likes}</h3>
        </div>
        <h5 className={cl.date}>{drawing.createDate}</h5>
      </div>
    </div>
  )
}

export default observer(DrawingItem);