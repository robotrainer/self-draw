import React, { FC } from 'react';
import cl from './toolbar.module.css';
import CanvasDraw from 'react-canvas-draw';

interface ToolBarProps {
  radius: number;
  color: string;
  draw: CanvasDraw | null;
  changeRadius: (radius: number) => void;
  changeColor: (color: string) => void;
}

const ToolBar: FC<ToolBarProps> = ({
  changeRadius,
  changeColor,
  draw,
  radius,
  color}) => {
  return (
    <div className={cl.container}>
      <div className={cl.toolBar}>
        <div className={cl.tools}>
          {/* <button>Color</button> */}
          <input
            onChange={(e) => changeColor(e.target.value)}
            type='color'
            value={color} 
          />
          <button onClick={() => changeColor('#ffffff')}>
            Eraser
          </button>
          <button onClick={() => draw?.undo()}>
            Undo
          </button>
          <button onClick={() => draw?.clear()}>
            Clear
          </button>
        </div>
        <label className={cl.brushSize}>
          Size:
          <input
            type='range'
            onChange={(e) => changeRadius(Number(e.target.value))}
            min={0}
            max={100}
            step={1}
            value={radius}
          />
        </label>
        <label className={cl.title}>
          Title:
          <input type='text' placeholder='text'/>
        </label>
        <div className={cl.controlBtn}>
          <button>Publish</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ToolBar;