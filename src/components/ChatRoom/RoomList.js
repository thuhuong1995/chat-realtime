import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../Context/AppProvider';
import './chatroom.css';

const { Panel } = Collapse;

const RoomList = () => {
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);

    const handleAddRoom = () => {
        setIsAddRoomVisible(true)
    }
    // => 
    return (
        <Collapse ghost defaultActiveKey={['1']} className='roomlist'>
            <Panel header='Room List' key='1' >
                <div className='roomlist-wrap'>
                    {
                        rooms.map(room =>
                            <Typography.Link
                                className='roomlist-number'
                                span={24}
                                key={room.id}
                                onClick={() => setSelectedRoomId(room.id)}
                            >
                                {room.name}
                            </Typography.Link>
                        )
                    }

                    <Button
                        type='text'
                        icon={<PlusSquareOutlined />}
                        className='roomlist-btn'
                        onClick={handleAddRoom}
                    >
                        add new room
                    </Button>
                </div>
            </Panel>
        </Collapse>
    );
}

export default RoomList;
