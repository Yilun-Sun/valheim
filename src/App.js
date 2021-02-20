import './App.scss';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { useEffect, useState  } from 'react';

import { ExampleComponent } from './component/ExampleComponent';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Popover, Button } from 'antd';

function App() {
  const [itemData, setItemData] = useState(0);

  const getData = () => {
    fetch('data/item.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setItemData(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const content = (data) => <ExampleComponent data={data} />;
  const { t } = useTranslation();
  const title = <span>{t('title')}</span>

  return (
    <div className='App'>
      <div className='language_selector'>
        <Button onClick={() => i18n.changeLanguage('en')}>en</Button>
        <Button onClick={() => i18n.changeLanguage('zh')}>zh</Button>
      </div>
      <header className='App-header'>
        <Popover content={content(itemData.wood_wall_45)} title={title}>
          <CloudinaryContext cloudName='valheim'>
            <Image className='item64' publicId='sprite/wood_wall_roof_45_f8odce.png' width='64' draggable='false' />
          </CloudinaryContext>
        </Popover>
      </header>
    </div>
  );
}

export default App;
