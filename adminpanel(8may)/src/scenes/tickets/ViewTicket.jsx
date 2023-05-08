import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Header from "../../components/Header";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { InputAdornment, IconButton } from "@mui/material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
  Avatar
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { formatDate } from '@fullcalendar/react';

const ViewTicket = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [replyLoading, setReplyLoading] = useState(false);
  const [replyError, setReplyError] = useState("");
  const [replySuccess, setReplySuccess] = useState("");
  const [user, setUser] = useState([]);
  const UserName = user.firstName + " " + user.lastName;
  const { id } = useParams();

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };

  // Fetch User
  const fetchUser = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/user/getUser/?userId=${id}`,
        config
      );
      setUser(res.data.data);
      setLoading(false);

    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));



  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/ticket/admin/ticketGetById?ticketId=${id}`,
        config
      );
      setTicket(res.data.data);
      setLoading(false);

    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTickets();
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/v1/ticket/admin/ticketDelete/${id}`,
        config
      )
      .then((res) => {
        setLoading(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
        navigate("/app/tickets");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      });
  };

  const handleReply = (id) => {
    setReplyLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/ticket/admin/ticketReply/${id}`,
        { conversation },
        config
      )
      .then((res) => {
        setReplyLoading(false);
        setReplySuccess(res.data.message);
        fetchTickets();
      })
      .catch((err) => {
        setReplyLoading(false);
        setReplyError(err.response.data.message);
      });
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
          backgroundColor: colors.background,
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            p: "0 0 0 40px",
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.white,
              minHeight: "100%",
              p: 3,
              width: isMobile ? "100%" : "70%",
            }}
          >
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 10,
              }}
            >
              <CardHeader title="Ticket Details"></CardHeader>
              <Divider />
              <CardContent>
                <Grid container>
                  <Grid item md={12} xs={12}>
                    <Typography variant="h2" color="textPrimary">
                      {ticket.subject}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={1}>
                  <Grid item md={2} xs={6}>
                    <Typography variant="h6" color="textPrimary">
                      Ticket ID
                    </Typography>
                  </Grid>
                  <Grid item md={10} xs={6}>
                    <Typography variant="body1" color="textSecondary">
                      #{ticket.ticketId}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={"0.5px"}>
                  <Grid item md={2} xs={6}>
                    <Typography variant="h6" color="textPrimary">
                      User
                    </Typography>
                  </Grid>
                  <Grid item md={10} xs={6}>
                    <Typography variant="body1" color="textSecondary">
                      {ticket.name}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={"0.5px"}>
                  <Grid item md={2} xs={6}>
                    <Typography variant="h6" color="textPrimary">
                      Created At
                    </Typography>
                  </Grid>
                  <Grid item md={10} xs={6}>
                    <Typography variant="body1" color="textSecondary">
                      {ticket.createdAt}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={"0.5px"}>
                  <Grid item md={2} xs={6}>
                    <Typography variant="h6" color="textPrimary">
                      Status
                    </Typography>
                  </Grid>
                  <Grid item md={10} xs={6}>
                    <Typography variant="body1" color="textSecondary">
                      {ticket.status}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={"0.5px"}>
                  <Grid item md={2} xs={6}>
                    <Typography variant="h6" color="textPrimary">
                      Description
                    </Typography>
                  </Grid>
                  <Grid item md={10} xs={6}>
                    <Typography variant="body1" color="textSecondary">
                      {ticket.query}
                    </Typography>
                  </Grid>
                </Grid>
                <Box
                  backgroundColor="#F0F0F0"
                  borderRadius={2}>
                  {ticket.conversation && ticket.conversation.length > 0 && (
                    <Box sx={{
                      p: 2,
                      backgroundColor: "#F0F0F0",
                      borderRadius: 2,
                      mt: 2,

                    }}>
                      <Typography variant="h6" color="textPrimary" style={{
                        fontWeight: "bold"
                      }}>
                        Conversation
                      </Typography>
                      <Divider />
                      {ticket.conversation.map((item) => (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 2,
                          }}
                        >
                          <Avatar sx={{
                            height: 30,
                            width: 30,
                            backgroundColor: "#3f51b5",
                            color: "#fff"
                          }}>{item.repliedBy.charAt(0).toUpperCase()}</Avatar>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mt: 2,
                            }}>
                            <Typography variant="body1" color="textPrimary">
                              {item.repliedBy}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{
                              marginLeft: "10px",
                              fontWeight: "bold",
                              color: "#3f51b5"

                            }}>
                              {item.message}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="textSecondary">
                            {
                              item.date = new Date(item.date).toLocaleString("en-US")
                            }

                            {/* ,{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                              hour: 'numeric', minute: 'numeric', second: 'numeric',  } */}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                  )}
                </Box>

                <Grid container mt={"100px"}>
                  <Grid item md={1} xs={1}>
                    <AccountCircleIcon
                      sx={{ fontSize: 30, color: "#3f51b5", margin: "auto" }}
                    />
                  </Grid>

                  <Grid item md={11} xs={11}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      size="small"
                      label="Reply"
                      name="reply"
                      onChange={(e) => setConversation(e.target.value)}
                      // required
                      value={conversation}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => handleReply(ticket._id)}>
                              <SendIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                {/* <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleReply(ticket._id)}
                  >
                    Reply
                  </Button>
                </Box>
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleDelete(ticket._id)}
                  >
                    Delete
                  </Button>
                </Box> */}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ViewTicket;
