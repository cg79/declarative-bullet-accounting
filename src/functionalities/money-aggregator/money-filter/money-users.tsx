import { useState } from 'react';
import CheckBoxList from '../../../_components/reuse/checkbox-list';
import { EntityUser } from '../../user/types';

const MoneyUsers = ({
  options,
  onItemsSelected,
}: {
  options: EntityUser[];
  onItemsSelected: (selectedUsers: EntityUser[]) => void;
}) => {
  return (
    <CheckBoxList
      options={options}
      labelField="nick"
      valueField="userid"
      name="sss"
      onItemsSelected={onItemsSelected}
    ></CheckBoxList>
  );
};

export default MoneyUsers;
