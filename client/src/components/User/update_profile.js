import React from 'react';
import UserLayout from '../../hoc/user';
import UpdatePersonalInfo from './update_personal_info';


const UpdateProfile = () => {
  return (
    <UserLayout>
      <UpdatePersonalInfo />
    </UserLayout>
  );
};

export default UpdateProfile;