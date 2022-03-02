import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import DrawingList from '../components/drawingList/DrawingList';
import { Context } from '../context';
import { DrawingResponse } from '../models/response/DrawingResponse';
import DrawingsService from '../service/drawingsService';
import '../style/App.css';

// TODO сделать декомпозицию
// TODO сделать декомпозицию стилей
const Drawings: FC = () => {
  const {store} = useContext(Context);
  const [drawings, setDrawings] = useState<DrawingResponse[]>([]);

  const getDrawings = async () => {
    store.setLoading(true);
    await DrawingsService.getAllDrawings().then((res) => {
      setDrawings(res.data);
    }).catch((error) => console.log(error.response.data.message)).finally(()=> store.setLoading(false));
  }

  useEffect(() => {
    getDrawings();
  }, [])

  if(store.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <DrawingList drawings={drawings} control={false}/>
    </div>
  );
}

export default observer(Drawings);
