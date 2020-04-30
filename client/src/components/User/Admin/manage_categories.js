import React from 'react';
import UserLayout from '../../../hoc/user';
import ManageBrands from './manage_brands';
import ManageTypes from './manage_types';

const ManageCategories = () => {
  return (
    <UserLayout>
      <ManageBrands/>
      <ManageTypes/>
    </UserLayout>
  );
};

export default ManageCategories;