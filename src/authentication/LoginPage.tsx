import * as React from "react";
import { Login, LoginForm } from 'ra-ui-materialui';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
    main: {
        background: 'linear-gradient(135deg, #37474F 0%, #607D8B 100%) !important'
    }
});

const LoginPage = props => (
    <Login
        loginForm={<LoginForm />}
        {...props}
    />
);

export default withStyles(styles)(LoginPage);
