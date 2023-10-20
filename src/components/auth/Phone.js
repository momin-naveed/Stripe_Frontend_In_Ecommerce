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

const PhoneVerfication = () => {
  const history = useHistory();
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const [msg, setMsg] = useState('');
  useEffect(() => {
    const localEmail = localStorage.getItem('email');
    setEmail(localEmail);
  }, []);

  const hanldeLogin = async (e) => {
    e.preventDefault();
    // return;
    try {
      await axios.post('https://shopproduct.dev/api/v1/users/send-opt', {
        countryCode: code,
        phoneNumber,
        email,
      });

      history.push('/verify-otp');

      setMsg('Otp Send SuccessFully');
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
          label="Code"
          placeholder="Enter Country Code"
          variant="outlined"
          fullWidth
          value={code}
          required
          onChange={(e) => setCode(e.target.value)}
        />
        <br />
        <br />
        <TextField
          label="Phone"
          placeholder="Enter Phone Number"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
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

export default PhoneVerfication;
