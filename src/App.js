import './App.scss';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { useEffect, useState } from 'react';

import { ExampleComponent } from './component/Default/ExampleComponent';
import { Armor } from './component/Armor/Armor';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Popover, Button } from 'antd';

const drawCubicPath = (startPoint, endPoint) => {
  // offset to icon center
  startPoint = [startPoint[0] + 32, startPoint[1] + 32];
  endPoint = [endPoint[0] + 32, endPoint[1] + 32];
  const controlPoint1 = [(startPoint[0] + endPoint[0]) / 2, startPoint[1]];
  const controlPoint2 = [(startPoint[0] + endPoint[0]) / 2, endPoint[1]];
  return (
    <path
      key=''
      d={`
    M ${startPoint}
    C ${controlPoint1} ${controlPoint2} ${endPoint}
  `}
      fill='none'
      stroke='rgba(255,255,255, 0.5)'
      strokeWidth={2}
    />
  );
};

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

  // const content = (data) => <ExampleComponent data={data} />;

  const { t } = useTranslation();
  const title = (itemId) => <span className='title'>{t(`Items.${itemId}.Name`)}</span>;

  const path = [];

  const arr = [];
  // const visitedNode = [];

  Object.values(itemData).forEach((item) => {
    let content;
    switch (item.Type) {
      case 'Armor':
        content = <Armor data={item} itemData={itemData} />;
        break;

      default:
        content = <ExampleComponent data={item} />;
        break;
    }

    item.left = Math.random() * 1000;
    item.top = Math.random() * 600;

    arr.push(
      <Popover content={content} title={title(item._id)} key={item._id}>
        <Image
          className='item64'
          style={{ left: `${item.left}px`, top: `${item.top}px` }}
          publicId={`sprite/${item.Type}/${item.IconName}`}
          width='64'
          draggable='false'
        />
      </Popover>
    );
  });

  console.log(itemData);
  Object.values(itemData).forEach((item) => {
    if (item.Properties.CraftingMaterials) {
      Object.keys(item.Properties.CraftingMaterials).forEach((material) => {
        if (itemData[material]) {
          path.push(drawCubicPath([itemData[material].left, itemData[material].top], [item.left, item.top]));
        }
      });
    }
    // path.push(drawCubicPath(startPoint, endPoint));
  });

  return (
    <div className='App'>
      {/* need to fix */}
      <svg style={{ zIndex: -10, width: '100%', minHeight: '99vh' }}>
        {path}
      </svg>
      <div className='language_selector'>
        <Button onClick={() => i18n.changeLanguage('en')}>en</Button>
        <Button onClick={() => i18n.changeLanguage('zh')}>zh</Button>
      </div>
      <CloudinaryContext cloudName='valheim'>{arr}</CloudinaryContext>
    </div>
  );
}

export default App;
