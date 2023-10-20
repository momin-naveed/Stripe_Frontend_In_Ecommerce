import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('strong!Passsword123');

  const hanldeLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(
        'https://shopproduct.dev/api/v1/users/signin',
        { email, password }
      );
      console.log(user);

      setEmail('');
      setPassword('');
      // toast.success('Login successfull');
      localStorage.setItem('token', JSON.stringify(user.data.accessToken));
      localStorage.setItem(
        'refreshToken',
        JSON.stringify(user.data.refreshToken)
      );

      history.push('/');
    } catch (err) {
      console.log(err);
      // toast.success('Invalid Credentials');
    }
  };

  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 500,
    margin: '20px auto',
  };

  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '8px 0' };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Log In In</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username"
          variant="outlined"
          fullWidth
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={hanldeLogin}
        >
          Sign in
        </Button>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {' '}
          Do you have an account ?
          <Link href="/sign-up">
            <i>Sign Up</i>
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
