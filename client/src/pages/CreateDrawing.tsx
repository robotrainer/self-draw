import React, { FC, useContext, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import ToolBar from '../components/UI/toolbar/ToolBar';
import { Context } from '../context';
import DrawingsService from '../service/drawingsService';

const CreateDrawing: FC = () => {
  const {store} = useContext(Context);
  const [brushRadius, setBrushRadius] = useState<number>(10);
  const [brushColor, setBrushColor] = useState<string>('#444444');
  const [draw, setDraw] = useState<CanvasDraw | null>(null);
  const [title, setTitle] = useState<string>('');

  const changeRadius = (radius: number) => {
    setBrushRadius(radius);
  }

  const changeColor = (color: string) => {
    setBrushColor(color);
  }

  const getTitle = (title: string) => {
    setTitle(title);
  }

  const createDrawing = async (url: string) => {
    store.setLoading(true);
    const urlSplit = url.split(',')[1];
    const draw = {
      title: title,
      imgBase64: urlSplit,
    }
    await DrawingsService.createDrawing(draw).then((res) => console.log(res)).catch((error) => console.log(error.response.data.message)).finally(() => store.setLoading(false));
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
        getTitle={getTitle}
        createDrawing={createDrawing}
        draw={draw}
        radius={brushRadius}
        color={brushColor}
      />
    </div>
  )
}

export default CreateDrawing