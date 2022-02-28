import React, { FC } from 'react';
import { DrawingResponse } from '../../models/response/DrawingResponse';
import DrawingItem from '../drawingItem/DrawingItem';
import cl from './drawinglist.module.css';

interface DrawingsProps {
  drawings: DrawingResponse[];
}

const DrawingList: FC<DrawingsProps> = ({drawings}) => {
  return (
    <div className={cl.drawingList}>
    {drawings.map((drawing) => 
      <DrawingItem key={drawing.id} drawing={drawing}/>
    )}
  </div>
  )
}

export default DrawingList