import React, { FC } from 'react';
import cl from './toolbar.module.css';
import CanvasDraw from 'react-canvas-draw';
import { useNavigate } from 'react-router-dom';

interface ToolBarProps {
  radius: number;
  color: string;
  draw: CanvasDraw | null;
  changeRadius: (radius: number) => void;
  changeColor: (color: string) => void;
  getTitle: (title: string) => void;
  createDrawing: (url: string) => void;
}

const ToolBar: FC<ToolBarProps> = ({
  changeRadius,
  changeColor,
  getTitle,
  createDrawing,
  draw,
  radius,
  color}) => {

    const navigate = useNavigate();

  return (
    <div className={cl.container}>
      <div className={cl.toolBar}>
        <div className={cl.tools}>
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
          <input
            type='text'
            placeholder='text'
            onChange={(e) => getTitle(e.target.value)}
          />
        </label>
        <div className={cl.controlBtn}>
          <button
            onClick={() => {
              draw?.getDataURL() && createDrawing(draw.getDataURL());
              navigate('/account');
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToolBar;

//TODO после нажатия на save и publish перенаправлять на страницу account только в том случае, если запросы прошли успешно