import React from 'react';
import { useTranslation } from 'react-i18next';
import '../translation/i18n';
import './Style.scss';

export const ExampleComponent = (props) => {
  const data = props.data;
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <div className='text_left'>{t('Types.Type')}</div>
        <div className='text_right'>{t('Types.' + data.Type)}</div>
      </div>
    </div>
  );
};
