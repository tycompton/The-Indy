import React from 'react';
import UserLayout from '../../hoc/user';
import MyButton from '../utils/button';
import UserHistoryBlock from '../utils/User/history_block';

const UserDashboard = ({user}) => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User Information</h1>
          <div>
            <span>{user.userData.name} {user.userData.lastname}</span>
            <span>{user.userData.email}</span>
            <span>{user.userData.address}</span>
            <span>{user.userData.phone}</span>
          </div>
          <MyButton
            type="default"
            title="Edit account info"
            linkTo="/user/user_profile"
          />
        </div>

        {
          user.userData.history ?
          <div className="user_nfo_panel">
            <h1>Your Orders</h1>
            <div className="user_product_block_wrapper">
              <UserHistoryBlock 
                products={user.userData.history}        
              />
            </div>
          </div>
          :null
        }

      </div>
    </UserLayout>
  );
};

export default UserDashboard;