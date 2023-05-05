import React, { useState, useEffect } from "react";
import { Avatar, Grid, Paper, Typography, TextField, Card, CardContent, Divider, Table, TableRow, TableBody, TableCell, TableContainer, TableHead } from "@mui/material";
import { useSnackbar } from "notistack";
import jwt from 'jwt-decode'
import axios from "axios";
import { Button, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";






const UserDetails = ({ user }) => {

  const navigate = useNavigate();

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
  }, [enqueueSnackbar]);

  // ******************************************Change Password Section********************************************************************//

  // Change Password Function
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (e.target.newPassword.value === e.target.confirmPassword.value) {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/user/updatePassword`, {
        oldpassword: e.target.oldPassword.value,
        newpassword: e.target.newPassword.value,
        cpassword: e.target.confirmPassword.value,
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          enqueueSnackbar("Password Changed Successfully", { variant: "success" });
          e.target.reset();
        })
        .catch((err) => {
          enqueueSnackbar("Error Occured", { variant: "error" });
        });
    } else {
      enqueueSnackbar("Password Mismatch", { variant: "error" });
    }
  };

  // ************************************************************************************************************************************//

  return (

    <div
      style={{
        padding: "20px",
      }}>
      <Card sx={{ minWidth: 275
      }}>
        <div style={{
          height: "120px",
          width: "100%",
          backgroundColor: "#f5f5f5",
        }}>
        </div>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <div>
                <Avatar
                  alt={accountInfo.firstName + " " + accountInfo.lastName}
                  src={"user.avatar"}
                  style={{
                    height: "150px",
                    width: "150px",
                    marginTop: "-75px",
                    border: "5px solid #f5f5f5",
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography variant="h1" gutterBottom>
                {accountInfo.firstName + " " + accountInfo.lastName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {accountInfo.email}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {accountInfo.mobile}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  float: "right",
                  marginTop: "20px",

                }}
                onClick={() => {
                  sessionStorage.removeItem("token");
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
          <Divider style={{
            marginTop: "30px",
            marginBottom: "30px",
          }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h2" gutterBottom>
                Password
              </Typography>
              <Typography variant="body1" gutterBottom>
                Please enter your current password and then enter your new password twice to change your password.
              </Typography>
              <form onSubmit={handleChangePassword}
                style={{
                  marginTop: "20px",
                }}>
                <TextField
                  id="oldPassword"
                  label="Old Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  style={{
                    marginBottom: "20px",
                  }}
                  onFocus={(e) => {
                    e.target.type = "text";
                  }
                  }
                  onBlur={(e) => {
                    e.target.type = "password";
                  }}

                />
                <TextField
                  id="newPassword"
                  label="New Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  style={{
                    marginBottom: "20px",
                  }}
                  onFocus={(e) => {
                    e.target.type = "text";
                  }
                  }
                  onBlur={(e) => {
                    e.target.type = "password";
                  }}
                />
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  style={{
                    marginBottom: "5px",
                  }}
                  onFocus={(e) => {
                    e.target.type = "text";
                  }
                  }
                  onBlur={(e) => {
                    e.target.type = "password";
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{
                    float: "right",
                  }}
                >
                  Change Password
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 275 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Typography variant="h3">
                          Account Information
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" sx={{
                        fontWeight: "bold",
                      }}>
                        First Name
                      </TableCell>
                      <TableCell align="right" sx={{
                        fontWeight: "bold",
                      }}>{accountInfo.firstName}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" sx={{
                        fontWeight: "bold",
                      }}>
                        Last Name
                      </TableCell>
                      <TableCell align="right" sx={{
                        fontWeight: "bold",
                      }}>{accountInfo.lastName}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" sx={{
                        fontWeight: "bold",
                      }}>
                        Email
                      </TableCell>
                      <TableCell align="right" sx={{
                        fontWeight: "bold",
                      }}>{accountInfo.email}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" sx={{
                        fontWeight: "bold",
                      }}>
                        Mobile
                      </TableCell>
                      <TableCell align="right" sx={{
                        fontWeight: "bold",
                      }}>{accountInfo.mobile}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" sx={{
                        fontWeight: "bold",
                      }}>
                        Role
                      </TableCell>
                      <TableCell align="right" sx={{
                        fontWeight: "bold",
                      }}>{accountInfo.roleType}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
