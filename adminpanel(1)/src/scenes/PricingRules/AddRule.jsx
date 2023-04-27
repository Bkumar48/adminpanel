import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TableContainer,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { makeStyles } from '@mui/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import { useNavigate, Link, useParams } from "react-router-dom";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from '@mui/icons-material/Delete';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      border: '1px solid #c4c4c4'
    }
  }
});

// define a initial row to show on page load
const initialRows = [{ from: '', to: '', discount: '' }];

const AddRule = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const enqueueSnackbar = useSnackbar();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();

  // state to store the title of the rule
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState([]);

  // Adding New Rows
  const [rows, setRows] = React.useState(initialRows);

  // function to add a new row
  const addRow = () => {
    setRows([...rows, { from: '', to: '', discount: '' }]);
  };

  // function to delete a row
  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  // function to submit the form
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      product_id: e.target.products.value,
      rules: rows,
    };
    const res = await axios.post("http://localhost:5000/pricingrules", data);
    if (res.status === 200) {
      enqueueSnackbar("Pricing Rule Added Successfully", {
        variant: "success",
      });
      navigate("/pricingrules");
    } else {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
      });
    }
  };


  return (
    <div>
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
              width: isMobile ? "100%" : "70%",
            }}
          >
            <Card>
              <Box m="15px 0 0 15px">
                <Header
                  subtitle={"Create a New Pricing Rule"}
                  title={"Product Pricing Rule"}
                />
              </Box>
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Rule Name"
                      name="title"
                      size="small"
                      variant="outlined"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Products"
                      name="title"
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TableContainer sx={{
                      mt: 5,

                    }}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }} align="center" colSpan={2}>
                              Quantity
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "bold" }}
                              rowSpan={2}
                              align="center"
                            >
                              Discount
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "bold" }}
                              rowSpan={2}
                              align="center"
                            >
                              Action
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">
                              From
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">
                              To
                            </TableCell>
                          </TableRow>
                          {rows.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell align="center">
                                <TextField
                                  fullWidth
                                  label="From"
                                  name="from"
                                  size="small"
                                  variant="outlined"
                                  value={row.from}
                                  onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].from = e.target.value;
                                    setRows(newRows);
                                  }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  fullWidth
                                  label="To"
                                  name="to"
                                  size="small"
                                  variant="outlined"
                                  value={row.to}
                                  onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].to = e.target.value;
                                    setRows(newRows);
                                  }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  fullWidth
                                  label="Discount"
                                  name="discount"
                                  size="small"
                                  variant="outlined"
                                  value={row.discount}
                                  onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].discount = e.target.value;
                                    setRows(newRows);
                                  }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                {index === rows.length - 1 ? (
                                  <Button
                                    color="success"
                                    variant="contained"
                                    type="button"
                                    onClick={addRow}
                                  >
                                    <PlaylistAddIcon />
                                  </Button>
                                ) : (
                                  <Button
                                    color="error"
                                    variant="contained"
                                    type="button"
                                    onClick={() => deleteRow(index)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                }}
              >
                <Button color="primary" variant="contained" type="submit">
                  Add Rule
                </Button>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>

    </div>
  );
};

export default AddRule;



// {rows.map((row, index) => (
//   <TableRow key={index}>
//     <TableCell align="center">
//       <TextField fullWidth label="From" name="from" size="small" variant="outlined" value={row.from} onChange={(e) => {
//         const newRows = [...rows];
//         newRows[index] = { ...newRows[index], from: e.target.value };
//         setRows(newRows);
//       }} />
//     </TableCell>
//     <TableCell align="center">
//       <TextField fullWidth label="To" name="to" size="small" variant="outlined" value={row.to} onChange={(e) => {
//         const newRows = [...rows];
//         newRows[index] = { ...newRows[index], to: e.target.value };
//         setRows(newRows);
//       }} />
//     </TableCell>
//     <TableCell align="center">
//       <TextField fullWidth label="Discount" name="discount" size="small" variant="outlined" value={row.discount} onChange={(e) => {
//         const newRows = [...rows];
//         newRows[index] = { ...newRows[index], discount: e.target.value };
//         setRows(newRows);
//       }} />
//     </TableCell>
//     <TableCell align="center">
//       {index === rows.length - 1 && (
//         <Button color="success" variant="contained" type="button" onClick={handleAddRow}>
//           <PlaylistAddIcon />
//         </Button>
//       )}
//     </TableCell>
//   </TableRow>
// ))}




{/* <TableRow>
                            <TableCell align="center">
                              <TextField
                                fullWidth
                                label="From"
                                name="title"
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                fullWidth
                                label="To"
                                name="title"
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                fullWidth
                                label="Discount"
                                name="title"
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                color="success"
                                variant="contained"
                                type="submit"
                                onClick={() => {
                                }}
                              >
                                <PlaylistAddIcon />
                              </Button>
                            </TableCell>
                          </TableRow> */}








//                           import React, { useState } from 'react';

// // define a initial row to show on page load
// const initialRows = [{ from: '', to: '', discount: '' }];

// function App() {
//   const [rows, setRows] = useState(initialRows);

//   // function to add a new row
//   const addRow = () => {
//     setRows([...rows, { from: '', to: '', discount: '' }]);
//   };

//   // function to delete a row
//   const deleteRow = (index) => {
//     const newRows = [...rows];
//     newRows.splice(index, 1);
//     setRows(newRows);
//   };

//   return (
//     <TableContainer sx={{ mt: 5 }}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell sx={{ fontWeight: 'bold' }} align="center" colSpan={2}>
//               Quantity
//             </TableCell>
//             <TableCell sx={{ fontWeight: 'bold' }} rowSpan={2} align="center">
//               Discount
//             </TableCell>
//             <TableCell sx={{ fontWeight: 'bold' }} rowSpan={2} align="center">
//               Action
//             </TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell sx={{ fontWeight: 'bold' }} align="center">
//               From
//             </TableCell>
//             <TableCell sx={{ fontWeight: 'bold' }} align="center">
//               To
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell align="center">
//                 <TextField
//                   fullWidth
//                   label="From"
//                   name="from"
//                   size="small"
//                   variant="outlined"
//                   value={row.from}
//                   onChange={(e) => {
//                     const newRows = [...rows];
//                     newRows[index].from = e.target.value;
//                     setRows(newRows);
//                   }}
//                 />
//               </TableCell>
//               <TableCell align="center">
//                 <TextField
//                   fullWidth
//                   label="To"
//                   name="to"
//                   size="small"
//                   variant="outlined"
//                   value={row.to}
//                   onChange={(e) => {
//                     const newRows = [...rows];
//                     newRows[index].to = e.target.value;
//                     setRows(newRows);
//                   }}
//                 />
//               </TableCell>
//               <TableCell align="center">
//                 <TextField
//                   fullWidth
//                   label="Discount"
//                   name="discount"
//                   size="small"
//                   variant="outlined"
//                   value={row.discount}
//                   onChange={(e) => {
//                     const newRows = [...rows];
//                     newRows[index].discount = e.target.value;
//                     setRows(newRows);
//                   }}
//                 />
//               </TableCell>
//               <TableCell align="center">
//                 {index === rows.length - 1 ? (
//                   <Button
//                     color="success"
//                     variant="contained"
//                     type="button"
//                     onClick={addRow}
//                   >
//                     <PlaylistAddIcon />
//                   </Button>
//                 ) : (
//                   <Button
//                     color="error"
//                     variant="contained"
//                     type="button"
//                     onClick={() => deleteRow(index)}
//                   >
//                     <DeleteIcon />
//                   </Button>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}