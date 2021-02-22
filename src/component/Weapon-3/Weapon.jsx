import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../translation/i18n';
import './Style.scss';
import { LeftRightText, HeaderText } from '../General';

export const Weapon = (props) => {
  const data = props.data.itemData;
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
    <div className='content'>
      <LeftRightText left={t('Types.Type')} right={t('Types.' + data.itemType)}></LeftRightText>
      {/* <LeftRightText left={t('Source')} right={data.Source}></LeftRightText> */}

      <HeaderText text={t('Properties.Properties')} />
      <LeftRightText left={t('Properties.Weight')} right={data.weight}></LeftRightText>
      <LeftRightText left={t('Properties.Durability')} right={props.data.itemData.maxDurability}></LeftRightText>

      <LeftRightText left={ "maxStackSize" } right={ data.maxStackSize }></LeftRightText>
      {data.value > 0 ? <LeftRightText left={ "value" } right={ data.value }></LeftRightText> : null}
      <LeftRightText left={ "teleportable" } right={ data.teleportable === 0 ? "No" : "Yes" }></LeftRightText>

      {/* <HeaderText text={t('Effects.Effects')} />
      <LeftRightText left={t('Effects.SetPieces')} right={data.Effects.SetPieces}></LeftRightText> */}
    </div>
  );
};
