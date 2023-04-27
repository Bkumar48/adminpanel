import React from "react";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      border: '1px solid black'
    }
  }
});
const AddRule = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const enqueueSnackbar = useSnackbar();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const classes = useStyles();


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
                    <Table  className={classes.table}>
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
                        <TableRow>
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
                              color="primary"
                              variant="contained"
                              type="submit"
                              onClick={() => {
                              }}
                            >
                              Add
                            </Button>
                          </TableCell>
                        </TableRow>
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
