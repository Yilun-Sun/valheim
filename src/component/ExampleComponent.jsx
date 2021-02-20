import React from 'react';
import { useTranslation } from 'react-i18next';
import '../translation/i18n';
import './Style.scss'

export const ExampleComponent = (props) => {
  const data = props.data;
  console.log(data);
  const { t } = useTranslation();

  return (
    <div>
      <p>
        <div className="text_left">{t('name')}</div>
        <div className="text_right">{t(props.data._id+'.Name')}</div>
      </p>
      <p>
        <div className="text_left">{t('type')}</div>
        <div className="text_right">{t('types.building')}</div>
      </p>
    </div>
  );
};
