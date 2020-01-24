import * as React from "react";
import { Login, LoginForm } from 'ra-ui-materialui';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
    main: {
        // Random image from the unsplash collection
        backgroundImage: 'url(https://source.unsplash.com/collection/175083/1600x900) !important',
        // Fallback background color
        backgroundColor: '#222 !important'
    }
});

const LoginPage = props => (
    <Login
        loginForm={<LoginForm />}
        {...props}
    />
);

export default withStyles(styles)(LoginPage);
