import './App.scss';
// import { Image, CloudinaryContext } from 'cloudinary-react';
import { useEffect, useState } from 'react';

import { ExampleComponent } from './component/Default/ExampleComponent';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Popover, Button } from 'antd';

import { Metal } from './component/Metal-1/Metal';
import { Food } from './component/Food-2/Food';
import { Weapon } from './component/Weapon-3/Weapon';

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
    // fetch('data/item.json', {
    fetch('data/itemList.json', {
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
  const getTitle = (title) => <span className='title'>{title}</span>;

  const path = [];

  const arr = [];
  // const visitedNode = [];

  Object.values(itemData).forEach((item, index) => {
    let content;
    console.log(item);
    switch (item.itemData.itemType) {
      // Metal
      case 1:
        content = <Metal data={item} />;
        break;
      case 2:
        content = <Food data={item} />;
        break;
      case 3:
        content = <Weapon data={item} />;
        break;

      default:
        content = <ExampleComponent data={item} />;
        break;
    }

    item.left = index * 100 + 100;
    item.top = 300;

    arr.push(
      <Popover content={content} title={getTitle(item.Name)} key={item._id}>
        {/* <Image
          className='item64'
          style={{ left: `${item.left}px`, top: `${item.top}px` }}
          publicId={`sprite/${item.itemData.itemType}/${item.Name.toLowerCase()}`}
          width='64'
          draggable='false'
        /> */}
        <img
          alt={item.Name.toLowerCase()}
          className='item64'
          style={{ left: `${item.left}px`, top: `${item.top}px` }}
          src={`${process.env.PUBLIC_URL}/static/${item.itemData.itemType}/${item.Name}.png`}
          width='64'
          draggable='false'
        ></img>
      </Popover>
    );
  });

  // console.log(itemData);
  // Object.values(itemData).forEach((item) => {
  //   if (item.Properties.CraftingMaterials) {
  //     Object.keys(item.Properties.CraftingMaterials).forEach((material) => {
  //       if (itemData[material]) {
  //         path.push(drawCubicPath([itemData[material].left, itemData[material].top], [item.left, item.top]));
  //       }
  //     });
  //   }
  //   // path.push(drawCubicPath(startPoint, endPoint));
  // });

  return (
    <div className='App'>
      {/* need to fix */}
      <svg style={{ zIndex: -10, width: '100%', minHeight: '99vh' }}>{path}</svg>
      <div className='language_selector'>
        <Button onClick={() => i18n.changeLanguage('en')}>en</Button>
        <Button onClick={() => i18n.changeLanguage('zh')}>zh</Button>
      </div>
      {arr}
      {/* <CloudinaryContext cloudName='valheim'>{arr}</CloudinaryContext> */}
    </div>
  );
}

export default App;
