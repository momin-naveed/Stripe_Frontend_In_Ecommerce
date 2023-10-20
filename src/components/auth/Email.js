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

const EmailVerfication = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const [msg, setMsg] = useState('');

  const hanldeLogin = async (e) => {
    e.preventDefault();
    // return;
    try {
      await axios.post('https://shopproduct.dev/api/v1/users/send-email-opt', {
        email,
      });

      // history.push('/sign-in');

      setMsg('Email Send SuccessFully');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const localEmail = localStorage.getItem('email');
    setEmail(localEmail);
  }, []);

  const paperStyle = {
    padding: 20,
    height: '40vh',
    width: 500,
    margin: '20px auto',
  };

  const avatarStyle = { backgroundColor: '#1brd7e' };
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
          label="Email"
          placeholder="Enter username"
          variant="outlined"
          fullWidth
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
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
        <Typography>
          {' '}
          Phone verfication ?<Link href="/phone-otp"> Click Here</Link>
        </Typography>
        <Typography>{msg}</Typography>
      </Paper>
    </Grid>
  );
};

export default EmailVerfication;
