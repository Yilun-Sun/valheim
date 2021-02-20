import './App.scss';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { useEffect, useState } from 'react';

import { ExampleComponent } from './component/ExampleComponent';
import { Armor } from './component/Armor/Armor';
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

  console.log(itemData);

  // const content = (data) => <ExampleComponent data={data} />;

  const { t } = useTranslation();
  const title = (itemId) => <span className="title">{t(itemId + '.Name')}</span>;

  const arr = [];

  Object.values(itemData).forEach((item) => {
    let content;
    switch (item.Type) {
      case 'Armor':
        content = <Armor data={item} />;
        break;

      default:
        content = <ExampleComponent data={item} />;
        break;
    }

    arr.push(
      <Popover content={content} title={title(item._id)} key={item._id}>
        <Image className='item64' publicId={`sprite/${item.Type}/${item.IconName}`} width='64' draggable='false' />
      </Popover>
    );
  });

  return (
    <div className='App'>
      <div className='language_selector'>
        <Button onClick={() => i18n.changeLanguage('en')}>en</Button>
        <Button onClick={() => i18n.changeLanguage('zh')}>zh</Button>
      </div>
      <header className='App-header'>
        <CloudinaryContext cloudName='valheim'>{arr}</CloudinaryContext>
      </header>
    </div>
  );
}

export default App;
