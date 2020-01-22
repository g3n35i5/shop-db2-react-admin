import React, { forwardRef } from 'react';
import { useLogout } from 'react-admin';
import MenuItem from '@material-ui/core/MenuItem';
import { LogoutVariant } from 'mdi-material-ui'
import Countdown from 'react-countdown';
import decodeJwt from 'jwt-decode';

const LogoutButton = forwardRef((props, ref) => {
    const token = localStorage.getItem('token');
    let exp: number = token ? decodeJwt(token).exp * 1000 : Date.now();

    const logout = useLogout();
    const handleClick = () => logout();
    return (
        <MenuItem onClick={handleClick}>
            <LogoutVariant/>&nbsp;Logout (<Countdown date={exp} daysInHours={true} />)
        </MenuItem>
    );
});

export default LogoutButton;
