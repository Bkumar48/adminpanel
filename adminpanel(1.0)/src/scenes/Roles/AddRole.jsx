import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Divider,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AddRole = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  //   const [nameSet, setNameSet] = React.useState(false);
  const [permissions, setPermissions] = useState({
    users: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    role: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    permission: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    page: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    blogs: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    blogs_cate: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    product: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    product_cate: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    coupon: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    ticket: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    faq: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    faq_cate: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    orders: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    testimonial: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    priceRules: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
  });

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const { name, description } = e.target.elements;
  //     const role = {
  //       name: name.value,
  //       description: description.value,
  //     };
  //     try {
  //       const res = await axios.post(
  //         `${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/create`,
  //         role,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //       console.log(role)
  //     }
  //   };

  return (
    <div 
  >
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
            p: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.white,
              borderRadius: 1,
              boxShadow: 5,
              width: isMobile ? "100%" : "50%",
            }}
          >
            <form>
              <Box m="15px 0 0 15px">
                <Header subtitle={"Add a New Role"} title={"Roles"} />
              </Box>
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Role Name"
                      name="name"
                      required
                      variant="outlined"
                      // onChange={(e) => {
                      //   setName(e.target.value);
                      // }}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      required
                      variant="outlined"
                      // onChange={(e) => {
                      //   setDescription(e.target.value);
                      // }}
                    />
                  </Grid>
                  {/* <Grid item md={12} xs={12}>
                    <FormControl component="fieldset" variant="standard">
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                        component="legend"
                      >
                        Permissions :{" "}
                      </FormLabel>
                    </FormControl>
                  </Grid> */}

                  {/* <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <FormControl component="fieldset" variant="standard">
                      <Grid>
                        <FormLabel component="legend">Users : </FormLabel>
                      </Grid>
                    </FormControl>
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="View" />
                    <FormControlLabel control={<Checkbox />} label="Edit" />
                    <FormControlLabel control={<Checkbox />} label="Delete" />
                  </Grid> */}
                </Grid>
              </CardContent>
              <Divider />
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                }}
              >
                <Button color="success" variant="contained">
                  Move to Permissions List
                </Button>
              </Box> */}
            </form>
          </Box>
        </Box>
      </Box>

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
            p: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.white,
              borderRadius: 1,
              boxShadow: 5,
              width: isMobile ? "100%" : "50%",
            }}
          >
            <form>
              <Box m="15px 0 0 15px">
                <Header subtitle={"Permissions"} />
              </Box>
              <Divider />

              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Permissions
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Create
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        View
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Edit
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      key={"Users"}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        {"Users"}
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox />
                      </TableCell>
                    </TableRow>
                    <TableRow
                        key={"Roles"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"Roles"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"Permissions"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"Permissions"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"page"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"  
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"Page"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"blogs"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"  
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"Blogs"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"blogs_cate"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"  
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"Blogs Category"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"Products"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"Products"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"product_cate"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"  
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"Products Category"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"coupon"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"  
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"Coupons"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"ticket"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"  
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"Tickets"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"faq"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"  
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"FAQs"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"faq_cate"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"  
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"FAQs Category"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"Orders"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"Orders"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"testimonial"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"  
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"Testimonials"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={"priceRules"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell
                            component="th"  
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                            >
                            {"Price Rules"}
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox />
                        </TableCell>
                        </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                }}
              >
                <Button color="success" variant="contained">
                  Move to Permissions List
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AddRole;

{
  /* <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Users</TableCell>
                            <TableCell align="center">Create</TableCell>
                            <TableCell align="center">View</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow
                            key={"Users"}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {"Users"}
                            </TableCell>
                            <TableCell align="center">
                            <Checkbox />
                            </TableCell>
                            <TableCell align="center">
                            <Checkbox />
                            </TableCell>
                            <TableCell align="center">
                            <Checkbox />
                            </TableCell>
                            <TableCell align="center">
                            <Checkbox />
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer> */
}
