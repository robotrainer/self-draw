import React, { FC } from 'react';
import cl from './toolbar.module.css';
import CanvasDraw from 'react-canvas-draw';

interface ToolBarProps {
  changeRadius: (radius: number) => void;
  changeColor: (color: string) => void;
  draw: CanvasDraw | null;
}

const ToolBar: FC<ToolBarProps> = ({changeRadius, changeColor, draw}) => {
  return (
    <div className={cl.container}>
      <div className={cl.toolBar}>
        <div className={cl.tools}>
          <button>Color</button>
          <button onClick={() => changeRadius(2)}>
            Size
          </button>
          <button onClick={() => changeColor('#fff')}>
            Eraser
          </button>
          <button onClick={() => draw?.undo()}>
            Undo
          </button>
          <button onClick={() => draw?.clear()}>
            Clear
          </button>
        </div>
        <div className={cl.title}>
          <input type='text' placeholder='title'/>
        </div>
        <div className={cl.controlBtn}>
          <button>Publish</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ToolBar