import React, { FC, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import ToolBar from '../components/UI/toolbar/ToolBar';

const CreateDrawing: FC = () => {
  const [brushRadius, setBrushRadius] = useState<number>(10);
  const [brushColor, setBrushColor] = useState<string>('#444444');
  const [draw, setDraw] = useState<CanvasDraw | null>(null);

  const changeRadius = (radius: number) => {
    setBrushRadius(radius);
  }

  const changeColor = (color: string) => {
    setBrushColor(color);
  }

  return (
    <div>
      <CanvasDraw
        ref={canvasDraw => draw !== canvasDraw && setDraw(canvasDraw)}
        brushColor={brushColor}
        hideGrid={true}
        canvasHeight={450}
        canvasWidth={360}
        lazyRadius={0}
        brushRadius={brushRadius}
      />
      <ToolBar
        changeRadius={changeRadius}
        changeColor={changeColor}
        draw={draw}
        radius={brushRadius}
        color={brushColor}
      />
    </div>
  )
}

export default CreateDrawing