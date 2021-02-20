import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../translation/i18n';
import './Style.scss';

export const Armor = (props) => {
  const data = props.data;
  const { t } = useTranslation();

  /**
   * Type
   * Source
   *
   * Properties:
   * Weight
   * Durability
   * Crafting Level
   * Repair Level
   * Crafting Materials: {}
   *
   * Defensive:
   * Armor
   *
   * Effects:
   * Set Pieces
   */

  return (
    <div className="content">
      <div>
        <div className='text_left'>{t('Types.Type')}</div>
        <div className='text_right'>{t('Types.' + data.Type)}</div>
      </div>
      <div>
        <div className='text_left'>{t('Source')}</div>
        <div className='text_right'>{data.Source}</div>
      </div>
      <div className='header'>{t('Properties.Properties')}</div>
      <div>
        <div className='text_left'>{t('Properties.Weight')}</div>
        <div className='text_right'>{data.Properties.Weight}</div>
      </div>
      <div>
        <div className='text_left'>{t('Properties.Durability')}</div>
        <div className='text_right'>{data.Properties.Durability}</div>
      </div>
      <div>
        <div className='text_left'>{t('Properties.CraftingLevel')}</div>
        <div className='text_right'>{data.Properties.CraftingLevel}</div>
      </div>
      <div>
        <div className='text_left'>{t('Properties.RepairLevel')}</div>
        <div className='text_right'>{data.Properties.RepairLevel}</div>
      </div>
      <div className='header'>{t('Defensive.Defensive')}</div>
      <div>
        <div className='text_left'>{t('Types.Armor')}</div>
        <div className='text_right'>{data.Defensive.Armor}</div>
      </div>
      <div className='header'>{t('Effects.Effects')}</div>
      <div>
        <div className='text_left'>{t('Effects.SetPieces')}</div>
        <div className='text_right'>{data.Effects.SetPieces}</div>
      </div>
    </div>
  );
};
