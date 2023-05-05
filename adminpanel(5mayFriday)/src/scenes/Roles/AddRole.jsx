import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { token, tokens } from "../../theme";
import { Box, Button, TextField, MenuItem, Divider, Card, CardContent, CardHeader, FormControl, Grid, FormLabel, FormControlLabel, CheckBox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "../../components/Header";

const AddRole = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // state variables for the Roles
    const [role, setRole] = useState({
        name: "",
        description: "",
    })

    // variable to store the roleId
    const [roleId, setRoleId] = useState(null);

    // state variables for the Permission
    const [permission, setPermission] = useState({
        roleId: roleId,
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

    // function to handle to submit the permission form
    const handlePermissionSubmit = (e) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/permissions/create-permission`, permission, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
        ).then((res) => {
            enqueueSnackbar("Permission Added Successfully : ", { variant: "success" })
            navigate("/roles/allroles")
        }).catch((err) => {
            enqueueSnackbar("Error Occured", { variant: "error" })
            console.log(err)
        })
    }

    // function to handle to submit the role form
    const handleSubmit = async (e) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/create`, role, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
        ).then((res) => {
            enqueueSnackbar("Role Added Successfully", { variant: "success" })
            setRoleId(res.data.roleId);
            setPermission({ ...permission, roleId: res.data.roleId })
        })
            .catch((err) => {
                enqueueSnackbar("Error Occured", { variant: "error" })
                console.log(err)
            })
    }

    useEffect(() => {
        if (roleId !== null) {
            handlePermissionSubmit();
        }
    })

    return (
        <div>
            <Header />
            <Box
                sx={{
                    backgroundColor: colors.background,
                    minHeight: "100%",
                }}
            > <Box
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
                                            onChange={(e) => setRole({ ...role, name: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            name="description"
                                            required
                                            variant="outlined"
                                            onChange={(e) => setRole({ ...role, description: e.target.value })}
                                        />
                                    </Grid>

                                </Grid>
                            </CardContent>
                            <Divider />

                            <TableContainer>
                                <Table sx={{ minWidth: 600 }} aria-label="simple table">
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
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Users
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.users.create}
                                                    onChange={(e) => setPermission({ ...permission, users: { ...permission.users, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.users.read}
                                                    onChange={(e) => setPermission({ ...permission, users: { ...permission.users, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.users.update}
                                                    onChange={(e) => setPermission({ ...permission, users: { ...permission.users, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.users.delete}
                                                    onChange={(e) => setPermission({ ...permission, users: { ...permission.users, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Roles
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.role.create}
                                                    onChange={(e) => setPermission({ ...permission, role: { ...permission.role, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.role.read}
                                                    onChange={(e) => setPermission({ ...permission, role: { ...permission.role, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.role.update}
                                                    onChange={(e) => setPermission({ ...permission, role: { ...permission.role, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.role.delete}
                                                    onChange={(e) => setPermission({ ...permission, role: { ...permission.role, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Permissions
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.permission.create}
                                                    onChange={(e) => setPermission({ ...permission, permission: { ...permission.permission, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.permission.read}
                                                    onChange={(e) => setPermission({ ...permission, permission: { ...permission.permission, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.permission.update}
                                                    onChange={(e) => setPermission({ ...permission, permission: { ...permission.permission, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.permission.delete}
                                                    onChange={(e) => setPermission({ ...permission, permission: { ...permission.permission, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Pages
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.page.create}
                                                    onChange={(e) => setPermission({ ...permission, page: { ...permission.page, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.page.read}
                                                    onChange={(e) => setPermission({ ...permission, page: { ...permission.page, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.page.update}
                                                    onChange={(e) => setPermission({ ...permission, page: { ...permission.page, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.page.delete}
                                                    onChange={(e) => setPermission({ ...permission, page: { ...permission.page, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Blogs
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.blogs.create}
                                                    onChange={(e) => setPermission({ ...permission, blogs: { ...permission.blogs, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.blogs.read}
                                                    onChange={(e) => setPermission({ ...permission, blogs: { ...permission.blogs, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.blogs.update}
                                                    onChange={(e) => setPermission({ ...permission, blogs: { ...permission.blogs, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.blogs.delete}
                                                    onChange={(e) => setPermission({ ...permission, blogs: { ...permission.blogs, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Blogs Categories
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.blogs_cate.create}
                                                    onChange={(e) => setPermission({ ...permission, blogs_cate: { ...permission.blogs_cate, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.blogs_cate.read}
                                                    onChange={(e) => setPermission({ ...permission, blogs_cate: { ...permission.blogs_cate, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.blogs_cate.update}
                                                    onChange={(e) => setPermission({ ...permission, blogs_cate: { ...permission.blogs_cate, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.blogs_cate.delete}
                                                    onChange={(e) => setPermission({ ...permission, blogs_cate: { ...permission.blogs_cate, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Products
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.product.create}
                                                    onChange={(e) => setPermission({ ...permission, product: { ...permission.product, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.product.read}
                                                    onChange={(e) => setPermission({ ...permission, product: { ...permission.product, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.product.update}
                                                    onChange={(e) => setPermission({ ...permission, product: { ...permission.product, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.product.delete}
                                                    onChange={(e) => setPermission({ ...permission, product: { ...permission.product, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Products Categories
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.product_cate.create}
                                                    onChange={(e) => setPermission({ ...permission, product_cate: { ...permission.product_cate, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.product_cate.read}
                                                    onChange={(e) => setPermission({ ...permission, product_cate: { ...permission.product_cate, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.product_cate.update}
                                                    onChange={(e) => setPermission({ ...permission, product_cate: { ...permission.product_cate, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.product_cate.delete}
                                                    onChange={(e) => setPermission({ ...permission, product_cate: { ...permission.product_cate, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Coupons
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.coupon.create}
                                                    onChange={(e) => setPermission({ ...permission, coupon: { ...permission.coupon, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.coupon.read}
                                                    onChange={(e) => setPermission({ ...permission, coupon: { ...permission.coupon, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.coupon.update}
                                                    onChange={(e) => setPermission({ ...permission, coupon: { ...permission.coupon, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.coupon.delete}
                                                    onChange={(e) => setPermission({ ...permission, coupon: { ...permission.coupon, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Tickets
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.ticket.create}
                                                    onChange={(e) => setPermission({ ...permission, ticket: { ...permission.ticket, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.ticket.read}
                                                    onChange={(e) => setPermission({ ...permission, ticket: { ...permission.ticket, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.ticket.update}
                                                    onChange={(e) => setPermission({ ...permission, ticket: { ...permission.ticket, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.ticket.delete}
                                                    onChange={(e) => setPermission({ ...permission, ticket: { ...permission.ticket, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                FAQs
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.faq.create}
                                                    onChange={(e) => setPermission({ ...permission, faq: { ...permission.faq, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.faq.read}
                                                    onChange={(e) => setPermission({ ...permission, faq: { ...permission.faq, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.faq.update}
                                                    onChange={(e) => setPermission({ ...permission, faq: { ...permission.faq, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.faq.delete}
                                                    onChange={(e) => setPermission({ ...permission, faq: { ...permission.faq, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                FAQs Categories
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.faq_cate.create}
                                                    onChange={(e) => setPermission({ ...permission, faq_cate: { ...permission.faq_cate, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.faq_cate.read}
                                                    onChange={(e) => setPermission({ ...permission, faq_cate: { ...permission.faq_cate, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.faq_cate.update}
                                                    onChange={(e) => setPermission({ ...permission, faq_cate: { ...permission.faq_cate, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.faq_cate.delete}
                                                    onChange={(e) => setPermission({ ...permission, faq_cate: { ...permission.faq_cate, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Orders
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.orders.create}
                                                    onChange={(e) => setPermission({ ...permission, order: { ...permission.order, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    disabled
                                                    checked={permission.orders.read}
                                                    onChange={(e) => setPermission({ ...permission, order: { ...permission.order, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    disabled
                                                    checked={permission.orders.update}
                                                    onChange={(e) => setPermission({ ...permission, order: { ...permission.order, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    disabled
                                                    checked={permission.orders.delete}
                                                    onChange={(e) => setPermission({ ...permission, order: { ...permission.order, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Testimonials
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.testimonial.create}
                                                    onChange={(e) => setPermission({ ...permission, testimonial: { ...permission.testimonial, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.testimonial.read}
                                                    onChange={(e) => setPermission({ ...permission, testimonial: { ...permission.testimonial, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.testimonial.update}
                                                    onChange={(e) => setPermission({ ...permission, testimonial: { ...permission.testimonial, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.testimonial.delete}
                                                    onChange={(e) => setPermission({ ...permission, testimonial: { ...permission.testimonial, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                backgroundColor: colors.background,
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: "bold" }}>
                                                Price Rules
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={permission.priceRules.create}
                                                    onChange={(e) => setPermission({ ...permission, priceRules: { ...permission.priceRules, create: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    disabled
                                                    checked={permission.priceRules.read}
                                                    onChange={(e) => setPermission({ ...permission, priceRules: { ...permission.priceRules, read: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    disabled
                                                    checked={permission.priceRules.update}
                                                    onChange={(e) => setPermission({ ...permission, priceRules: { ...permission.priceRules, update: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    disabled
                                                    checked={permission.priceRules.delete}
                                                    onChange={(e) => setPermission({ ...permission, priceRules: { ...permission.priceRules, delete: e.target.checked } })}
                                                    inputProps={{ "aria-label": "controlled" }}
                                                />
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
                                <Button color="success" variant="contained" onClick={() => {
                                    handleSubmit();
                                }}>
                                    Add Role
                                </Button>
                            </Box>

                        </form>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default AddRole