import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Header from "../../components/Header";
import axios from "axios";
import { tokens } from "../../theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { InputAdornment, IconButton } from "@mui/material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { formatDate } from "@fullcalendar/react";

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
  const [user, setUser] = useState({});
  const [chats, setChats] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };

  // fetch Users
  // const fetchUser = async (id) => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/api/v1/user/getUser/?userId=${id}`,
  //       config
  //     );
  //     return res.data.data.name;
  //   } catch (error) {
  //     setError(error);
  //     setLoading(false);
  //     enqueueSnackbar(error, { variant: "error" });
  //   }
  // };


  // fetch Tickets
  // const fetchTickets = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/api/v1/ticket/admin/ticketGetById?ticketId=${id}`,
  //       config
  //     );
  //     setTicket(res.data.data);
  //     // setUser(res.data.data.conversation);
  //     // console.log(res.data.data.conversation)
  //     setLoading(false);

  //   } catch (error) {
  //     setError(error.response.data.message);
  //     setLoading(false);
  //     enqueueSnackbar(error.response.data.message, { variant: "error" });
  //   }
  // };

  // useEffect(() => {
  //   fetchTickets();
  // }, []);


  // const fetchTickets = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/api/v1/ticket/admin/ticketGetById?ticketId=${id}`,
  //       config
  //     );
  //     setTicket(res.data.data);
  //     setChats(res.data.data.conversation);
  //     setLoading(false);

  //   } catch (error) {
  //     setError(error.response.data.message);
  //     setLoading(false);
  //     enqueueSnackbar(error.response.data.message, { variant: "error" });
  //   }
  // };

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/ticket/admin/ticketGetById?ticketId=${id}`,
        config
      );
      setTicket(res.data.data);
      setChats(res.data.data.conversation);
      setLoading(false);
  
      // Fetch User Names
      const userIds = res.data.data.conversation.map((item) => item.repliedBy);
      const promises = userIds.map((id) =>
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/getUser/?userId=${id}`, config)
      );
      const responses = await Promise.all(promises);
      const users = responses.map((res) => res.data.data.firstName + " " + res.data.data.lastName);
      setUser(users);
      // console.log(users)
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

  

const handleReply = (id) => {
  setReplyLoading(true);
  axios
    .put(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ticket/thread?ticketId=${id}`,
      { message: conversation },
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
                    {ticket.createdAt = new Date().toLocaleString()}
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

              {/* Responsive Conversation Box */}
              <Box sx={{ backgroundColor: "#F0F0F0", borderRadius: 2 }}>
                {ticket.conversation && ticket.conversation.length > 0 && (
                  <Box sx={{ p: 2, mt: 2 }}>
                    <Typography variant="h6" color="textPrimary" style={{ fontWeight: "bold" }}>
                      Conversation
                    </Typography>
                    <Divider />
                    <TableContainer >
                      <Table>
                        <TableBody>
                          {ticket.conversation.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{
                                width: 50,
                              }}>
                                <Avatar sx={{ height: 30, width: 30, backgroundColor: "#3f51b5", color: "#fff" }}>
                                  {user[index] && user[index].charAt(0)}
                                </Avatar>
                              </TableCell>
                              <TableCell sx={{
                                width: 110,
                                color: "#3f51b5",
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}>
                                {user[index]}
                              </TableCell>
                              <TableCell >
                                <Typography variant="body2" color="textSecondary" style={{ fontWeight: "bold", fontSize: "14px", }}>
                                  {item.message}
                                </Typography>
                              </TableCell>
                              <TableCell sx={{
                                textAlign: "right",
                              }}>
                                <Typography variant="body2" color="textSecondary">
                                  {new Date(item.date).toLocaleString("en-US")}
                                  {/* {formatDate(new Date(item.createdAt), {timeZone: 'UTC', timeZoneName: 'short'})} */}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </Box>

              {/* <Grid container mt={"100px"}>
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
                      value={conversation}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => {
                              handleReply(ticket._id);
                              console.log(ticket._id);
                              setConversation("")
                            }}>
                              <SendIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid> */}

              <Grid container spacing={2} mt={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Type Your Reply"
                    margin="dense"
                    name="message"
                    value={conversation}
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={(e) => setConversation(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            color="primary"
                            onClick={() => { handleReply(id); setConversation("") }}
                          >
                            {replyLoading ? (
                              <CircularProgress
                                color="inherit"
                                size={20}
                              />
                            ) : (
                              <SendIcon />
                            )}
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
