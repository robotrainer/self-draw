import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../context';
import { DrawingResponse } from '../models/response/DrawingResponse';
import DrawingsService from '../service/drawingsService';
import '../style/App.css';

// TODO сделать декомпозицию
// TODO создать интереыейс для drawings и перенести в отдельный файл
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
      <h2>User is logged in {store.user.login}</h2>
      <button onClick={()=> store.logout()}>Log out</button>
      <div style={{overflow: 'auto', height: 700}}>
        {drawings.map((drawing) => 
          <div key={drawing.id}>
            <img src={drawing.url} alt=''/>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: 10}}>
              <div>{drawing.title}</div>
              <div>{drawing.author.login}</div>
              <div>{drawing.likes}</div>
            </div>
          </div>
        )}
      </div>
      <div>Menu</div>
    </div>
  );
}

export default observer(Drawings);
