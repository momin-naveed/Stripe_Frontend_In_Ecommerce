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
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const history = useHistory();
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('strong!Passsword123');
  const [confirmPassword, setConfirmPassword] = useState('strong!Passsword123');
  const [firstName, setFirstName] = useState('Momin');

  const hanldeLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(
        'https://shopproduct.dev/api/v1/users/signup',
        { email, password, confirmPassword, firstName }
      );

      setEmail('');
      setPassword('');
      localStorage.setItem('email', email);

      history.push('/otp');
    } catch (err) {
      console.log(err);
    }
  };

  const paperStyle = {
    padding: 20,
    height: '80vh',
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
          <h2>Sign Up</h2>
        </Grid>
        <TextField
          label="Name"
          placeholder="Enter Name"
          type="Name"
          value={firstName}
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <br />
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
        <br />
        <br />
        <TextField
          label="confirm Password"
          placeholder="Enter confirm Password"
          type="password"
          value={confirmPassword}
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={hanldeLogin}
        >
          Sign up
        </Button>
        <Typography>
          {' '}
          Do you have an account ?<Link href="/sign-in"> Sign In</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signup;
