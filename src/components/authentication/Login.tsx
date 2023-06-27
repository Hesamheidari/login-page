import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Grid, TextField, Typography, Slide, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from 'react-toastify';
import { useAuth } from "../../context/AuthProvider";
import lawOnline from '../../assests/images/law-online.png';
import logo_sep from '../../assests/images/logo_sep.JPG';

import styled from '@mui/material/styles/styled';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


// mui rtl
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
  typography: {
    fontFamily: 'Shabnam',
  },
});

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#00A5FF',
    },
    text: {
      primary: '#333333',
    },
  },
});

const StyledTypography = styled(Typography)({
    color: "#0A253B",
    "& span": {
      color: "#EFC480",
    },
  });


const Login: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    setShow(true);
  }, []);

  const showErrorMessage = (errorMessage: string) => {
    toast.error(errorMessage, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
    });
  };

  const showSuccessMessage = (message: string) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
    });
  };

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (phoneNumber === '' || password === '') {
      showErrorMessage("لطفا شماره موبایل و رمز عبور را وارد کنید.");
      return;
    } else {
      const success = await login(phoneNumber, password);
      if (success === "success") {
        showSuccessMessage("با موفقیت وارد شدید.");
        await delay(3000);
        navigate("/");
      } else {
        showErrorMessage("ورود با خطا مواجه شد.");
      }
    }
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <>
      <Helmet>
        <title>ورود به سپنتا</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              backgroundColor: "#F4F4F4",
            }}
          >
            <Grid item xs={12} sm={6} md={4} sx={{width:'578px',gap:'56px', height:'603px', borderRadius:'24px', padding: '24px', backgroundColor: '#F6F6F6' }}>
              <Slide direction="up" in={show} mountOnEnter unmountOnExit>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <Avatar
                    alt="profile"
                    src={logo_sep}
                    sx={{ width: '150px', height: '150px', margin: '0 auto' }}
                    />
                  <StyledTypography variant="h5" component="h1" align="center">
                      به <span style={{ color: "#EFC480" }}>سپنتا</span> خوش آمدید!
                    </StyledTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="شماره موبایل"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      variant="outlined"
                      autoFocus
                      inputProps={{
                        maxLength: 11,
                        inputMode: "numeric",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="رمز عبور"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="مرا به خاطر بسپار" />

                    <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
                      ورود
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" align="center" color="textPrimary">
                      حساب کاربری ندارید؟
                      <Link to="/register">ثبت نام کنید</Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Slide>
            </Grid>
            <Grid item xs={12} sm={6} md={8} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
              <img src={lawOnline} alt="Law Online" style={{ width: '916px', height: '750px', objectFit: 'cover' }} />
            </Grid>
          </Grid>
        </CacheProvider>
      </ThemeProvider>
    </>
  );
};

export default Login;