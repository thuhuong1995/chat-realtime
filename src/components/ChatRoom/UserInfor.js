import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Typography } from 'antd';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { auth } from '../firebase/config';

const UserInfor = () => {
    const { user: {
        displayName,
        photoURL
    } } = useContext(AuthContext);
    return (
        <div className='user'>
            <div className='user-wrap'>
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0).toUpperCase()}</Avatar>
                <Typography.Text className='user-name'>{displayName}</Typography.Text>
            </div>
            <Button
                icon={<LogoutOutlined />}
                className='user-btn'
                ghost
                onClick={() => auth.signOut()}
            >
                Logout
            </Button>
        </div >
    );
}

export default UserInfor;
