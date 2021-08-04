import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unSubcrible = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                setLoading(false);
                history.push('/');
                return;
            }
            setLoading(false);
            history.push('/login');

        })
        return () => {
            unSubcrible();
        }
    }, [history]);

    return (
        <AuthContext.Provider value={{ user }} >
            {loading ? <Spin /> : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
