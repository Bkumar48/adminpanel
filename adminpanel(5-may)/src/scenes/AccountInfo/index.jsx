import React, { useState, useEffect } from "react";
import { Avatar, Container, Grid, Paper, Typography, TextField, Card, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";
import jwt from 'jwt-decode'
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    margin: "auto",
    maxWidth: 600,
    textAlign: "center",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "auto",
  },
}));





const UserDetails = ({ user }) => {

  // Acount Get information
  const [accountInfo, setAccountInfo] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const decoded = jwt(token);
    const userId = decoded.user_id;
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/getUser/?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAccountInfo(res.data.data);
      })
      .catch((err) => {
        enqueueSnackbar("Error Occured", { variant: "error" });
      });
  }, []);

  // Change Password Section

  // Get Logged in User Information
  const [oldPassword, setOldPassword] = useState("");

  const fetchOldPassword = async (e) => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/getPassword`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setOldPassword(res.data.data.password);

      })
      .catch((err) => {
        enqueueSnackbar("Error Occured", { variant: "error" });
      });
  }

  // call fetchOldPassword function
  useEffect(() => {
    fetchOldPassword();
  }, []);

  // 





  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper className={classes.paper} elevation={3}>
          <Avatar
            className={classes.avatar}
            alt={accountInfo.firstName + " " + accountInfo.lastName}
            src={"user.avatar"}
          />
          <Typography variant="h5" gutterBottom>
            {accountInfo.firstName + " " + accountInfo.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {accountInfo.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {accountInfo.mobile}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" gutterBottom>
                Username: {accountInfo.userName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" gutterBottom>
                Website: {"user.website"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper>
          <Card>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                Change Password
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Old Password"
                    name="oldPassword"
                    size="small"
                    type="password"
                    variant="outlined"
                  // onChange={handleChangePassword}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    size="small"
                    type="password"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    size="small"
                    type="password"
                    variant="outlined"
                  />
                </Grid>
              </Grid>

            </CardContent>
          </Card>
        </Paper>
      </Container>
    </div>
  );
};

export default UserDetails;
