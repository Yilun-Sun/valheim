import './App.scss';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { useEffect } from 'react';

import { ExampleComponent } from "./component/ExampleComponent";
import i18n from "i18next";

function App() {
  const getData = () => {
    fetch('data/item.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <CloudinaryContext cloudName='valheim'>
          <Image className='item64' publicId='sprite/wood_wall_roof_45_f8odce.png' width='64' draggable='false' />
        </CloudinaryContext>
        <ExampleComponent />
        <button onClick={() => i18n.changeLanguage('en')}>en</button>
        <button onClick={() => i18n.changeLanguage('zh')}>zh</button>
      </header>
    </div>
  );
}

export default App;
