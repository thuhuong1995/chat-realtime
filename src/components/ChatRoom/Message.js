import { Avatar, Typography } from 'antd';
import './chatwindow.css';
import React from 'react';
import { formatRelative } from 'date-fns';

const formatDate = (seconds) => {
    let formatedDate = '';
    if (seconds) {
        formatedDate = formatRelative(new Date(seconds * 1000), new Date());
        // formatRelative in dns libr, so sánh 2 giá trị thời gian ?

        formatedDate = formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1);
        // viết hoa ký tự đầu + các ký tự còn lại
    };

    return formatedDate;
}

const Message = ({ text, displayName, createAt, photoURL }) => {
    return (
        <div className='message'>
            <div className='message__info'>
                <Avatar size='small' src={photoURL}>
                    {photoURL ? '' : displayName.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className='message__name'>{displayName}</Typography.Text>
                <Typography.Text className='message__time'>{formatDate(createAt?.seconds)}</Typography.Text>
            </div>
            <div className='message__text'>
                <Typography.Text>{text}</Typography.Text>
            </div>
        </div>
    );
}

export default Message;
