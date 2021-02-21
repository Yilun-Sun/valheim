import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../translation/i18n';
import './Style.scss';
import { LeftRightText } from '../General';

export const ExampleComponent = (props) => {
  const data = props.data;
  const { t } = useTranslation();

  return (
    <div>
      <LeftRightText left={t('Types.Type')} right={t('Types.' + data.Type)}></LeftRightText>
    </div>
  );
};
