import React, { FC } from 'react';
import { DrawingResponse } from '../../models/response/DrawingResponse';
import DrawingItem from '../drawingItem/DrawingItem';
import cl from './drawinglist.module.css';

interface DrawingsProps {
  drawings: DrawingResponse[];
  control: boolean;
  remove?: (drawing: DrawingResponse) => void;
  publish?: (drawing: DrawingResponse) => void;
}

const DrawingList: FC<DrawingsProps> = ({drawings, control, remove, publish}) => {
  return (
    <div className={cl.drawingList}>
    {drawings.map((drawing) => 
      <div key={drawing.id}>
        <DrawingItem drawing={drawing}/>
        {control &&
          <div className={cl.drawingList__control}>
            {drawing.publication
              ? <button onClick={() => publish && publish(drawing)}>Unpublish</button>
              : <button onClick={() => publish && publish(drawing)}>Publish</button> 
            }
            <button onClick={() => remove && remove(drawing)}>Delete</button>
          </div>
        }
    </div>
    )}
  </div>
  )
}

export default DrawingList;