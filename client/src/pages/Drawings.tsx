import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import DrawingList from '../components/drawingList/DrawingList';
import Logo from '../components/UI/logo/Logo';
import TabBar from '../components/UI/tabbar/TabBar';
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
    await DrawingsService.getAllDrawings().then((res) => {
      setDrawings(res.data);
    }).catch((error) => console.log(error.response.data.message));
  }

  useEffect(() => {
    getDrawings();
  }, [])

  if(store.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Logo title='SelfDraw'/>
      <DrawingList drawings={drawings}/>
      <TabBar />
    </div>
  );
}

export default observer(Drawings);
