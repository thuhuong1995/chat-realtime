import React from 'react';
import './login.css'
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../firebase/config';
import { addDocument, generateKeywords } from '../firebase/services';


const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();

const Login = () => {

    const handleFbLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);

        if (additionalUserInfo?.isNewUser) {
            // check additionalUserInfo exit isNewUser 
            addDocument('user', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
                // providerID show connect by ... ex: => facebook.com, gooogle.com .etc

            })
            // addDocument is func in ./firebase/services.js 
        }
    };

    return (
        <div className='login'>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>Login to Chat</Title>
                    <div className='login-group'>
                        <Button
                            className='login-btn login-btn__google'
                        >
                            Login by Google
                        </Button>
                        <Button
                            className='login-btn login-btn__fb'
                            onClick={handleFbLogin}
                        >
                            Login by Facebook
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
