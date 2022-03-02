import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect, useState } from 'react'
import DrawingList from '../components/drawingList/DrawingList';
import { Context } from '../context'
import { DrawingResponse } from '../models/response/DrawingResponse';
import DrawingsService from '../service/drawingsService';

const Account: FC = () => {
  const {store} = useContext(Context);
  const [drawings, setDrawings] = useState<DrawingResponse[]>([]);

  const getDrawings = async () => {
    await DrawingsService.getDrawingsUser().then((res) => {
      setDrawings(res.data);
    }).catch((error) => console.log(error.response.data.message));
  }

  useEffect(() => {
    if(!store.isLoading) {
      getDrawings();
    }
  }, [store.isLoading])

  const removeDrawing = (drawing: DrawingResponse) => {
    setDrawings(drawings.filter((d) => d.id !== drawing.id));
  }

  const publishDrawing = async (drawing: DrawingResponse) => {
    const publishDrawing = {
      id: drawing.id,
      publication: !drawing.publication,
    }
    await DrawingsService.publishDrawing(publishDrawing).then(() => 
      getDrawings()
    ).catch((error) => console.log(error.response.data.message));
  }

  if(store.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <DrawingList
        drawings={drawings}
        control={true}
        remove={removeDrawing}
        publish={publishDrawing}
      />
    </div>
  );
}

export default observer(Account);