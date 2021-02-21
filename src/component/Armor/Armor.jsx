import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../translation/i18n';
import './Style.scss';
import { LeftRightText, HeaderText } from '../General';

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

  // get crafting materials name
  const CraftingMaterials = data.Properties.CraftingMaterials;
  let craftingMaterials = [];
  Object.keys(CraftingMaterials).forEach((item) => {
    craftingMaterials.push(
      <LeftRightText
        left={t(`Items.${props.itemData[item.toString()]._id}.Name`)}
        right={CraftingMaterials[item.toString()]}
      ></LeftRightText>
    );
  });

  return (
    <div className='content'>
      <LeftRightText left={t('Types.Type')} right={t('Types.' + data.Type)}></LeftRightText>
      <LeftRightText left={t('Source')} right={data.Source}></LeftRightText>

      <HeaderText text={t('Properties.Properties')} />
      <LeftRightText left={t('Properties.Weight')} right={data.Properties.Weight}></LeftRightText>
      <LeftRightText left={t('Properties.Durability')} right={data.Properties.Durability}></LeftRightText>
      <LeftRightText left={t('Properties.CraftingLevel')} right={data.Properties.CraftingLevel}></LeftRightText>
      <LeftRightText left={t('Properties.RepairLevel')} right={data.Properties.RepairLevel}></LeftRightText>

      <HeaderText text={t('Defensive.Defensive')} />
      <LeftRightText left={t('Types.Armor')} right={data.Defensive.Armor}></LeftRightText>

      <HeaderText text={t('Effects.Effects')} />
      <LeftRightText left={t('Effects.SetPieces')} right={data.Effects.SetPieces}></LeftRightText>

      <HeaderText text={t('Properties.CraftingMaterials')} />
      {craftingMaterials}
    </div>
  );
};
