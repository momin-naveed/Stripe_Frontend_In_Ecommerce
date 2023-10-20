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
import { useEffect } from 'react';

const OTPVerfication = () => {
  const history = useHistory();
  const [otp, setOtp] = useState('');

  const [msg, setMsg] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const localEmail = localStorage.getItem('email');
    setEmail(localEmail);
  }, []);

  const hanldeLogin = async (e) => {
    e.preventDefault();
    // return;
    try {
      await axios.post('https://shopproduct.dev/api/v1/users/verify-opt', {
        opt: otp,
        email,
      });

      history.push('/sign-in');
    } catch (err) {
      console.log(err);
    }
  };

  const paperStyle = {
    padding: 20,
    height: '40vh',
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
          <h2>Verification</h2>
        </Grid>
        <TextField
          label="OTP"
          placeholder="Enter opt"
          variant="outlined"
          fullWidth
          value={otp}
          required
          onChange={(e) => setOtp(e.target.value)}
        />
        <br />
        <br />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={hanldeLogin}
        >
          Submit
        </Button>
      </Paper>
    </Grid>
  );
};

export default OTPVerfication;
