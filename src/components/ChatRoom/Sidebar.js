import React from 'react';
import './chatroom.css'
import { Row, Col } from 'antd';
import UserInfor from './UserInfor';
import RoomList from './RoomList';

const Sidebar = () => {
    return (
        <Row>
            <Col span={24}><UserInfor /></Col>
            <Col span={24}><RoomList /></Col>
        </Row>
    );
}

export default Sidebar;
