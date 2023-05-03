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
import { components } from "react-select";
import makeAnimated from "react-select/animated";
import Multiselect from "multiselect-react-dropdown";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        "& .MuiTableCell-root": {
            border: '1px solid #c4c4c4'
        }
    }
});

const EditRule = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const classes = useStyles();

    // state to store the title of the rule
    const [title, setTitle] = useState("");
    const [products, setProducts] = useState([]);

    // define a initial row to show on page load
    const initialRows = [{ from: '', to: '', discount: '' }];

    // state to store the rows
    const [rows, setRows] = useState(initialRows);


    // fetch the rule data
    const { id } = useParams();
    useEffect(() => {
        const fetchRuleData = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/pricerules/getSinglePriceRules?rulesId=${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            if (res.status === 200) {
                setTitle(res.data.priceRules[0].title);
                setProducts(res.data.priceRules[0].product_id);
                setRows(res.data.priceRules[0].variants);
            } else {
                enqueueSnackbar("Something went wrong", {
                    variant: "error",
                });
            }
        };
        fetchRuleData();
    }, []);


    // fetch all products
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/pricerules/getProductListed`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            if (res.status === 200) {
                setAllProducts(res.data.data);
            } else {
                enqueueSnackbar("Something went wrong", {
                    variant: "error",
                });
            }
        };
        fetchProducts();
    }, []);

    // function to handle change in input fields
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...rows];
        list[index][name] = value;
        setRows(list);
    };

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

    const data = {
        title: title,
        product_id: products,
        variants: rows,
    }
    console.log(data)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/pricerules/updatePriceRules?rulesId=${id}`, {
            title: title,
            product_id: products,
            variants: rows,
        }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        if (res.status === 200) {
            enqueueSnackbar("Pricing Rule Updated Successfully", {
                variant: "success",

            })
            console.log(res.data);
            navigate("/pricing/allrules");
        } else {
            enqueueSnackbar("Something went wrong", {
                variant: "error",
            })
            console.log(res.data);
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
                                    subtitle={"Update a Product Pricing Rule"}
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
                                        <Multiselect
                                            isObject={true}
                                            onRemove={(event) => {
                                                // console.log(event);
                                                setProducts(event);
                                            }}
                                            onSelect={(event) => {
                                                // console.log(event);
                                                setProducts(event);
                                            }}
                                            options={allProducts}
                                            selectedValues={products}
                                            displayValue="title"
                                            showCheckbox
                                            placeholder="Select Products"
                                            emptyRecordMsg="No Products Found"
                                            style={{
                                                chips: {
                                                    // background: "#F5F5F5",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                },
                                                multiselectContainer: {
                                                    color: "#000000",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                },
                                                optionContainer: {
                                                    background: "#F5F5F5",
                                                    color: "#000000",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                },
                                            }}
                                        />

                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <TableContainer sx={{ maxHeight: 400 }}>
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
                                                                        console.log(newRows)
                                                                        setRows(newRows);
                                                                        handleChange(e, index);
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
                                                                        handleChange(e, index);
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
                                                                        handleChange(e, index);

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
                                <Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>
                                    Update Rule
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                </Box>
            </Box>

        </div>
    );
};

export default EditRule;

