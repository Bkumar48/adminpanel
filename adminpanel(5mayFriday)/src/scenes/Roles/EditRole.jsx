import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { tokens } from "../../theme";
import { Box, Button, TextField, MenuItem, Divider, Card, CardContent, CardHeader, FormControl, Grid, FormLabel, FormControlLabel, CheckBox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "../../components/Header";

const EditRole = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // State varialbles for Role
    const [role, setRole] = useState({
        name: "",
        description: "",
    });

    // State variables for Permissions
    const [permissions, setPermissions] = useState([]);

    // Get role details
    const getRole = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/getOneRole?roleId=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            if (response.status === 200) {
                setRole(response.data.data);
                setPermissions(response.data.data.permissions);
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
            setError(true);
        }
        setLoading(false);
    };

    // Call getRole function on mount
    useEffect(() => {
        getRole();
    }, []);

    // Update Role Permissions by Role ID
    const updateRolePermissions = async () => {
        setLoading(true);
        setError(false);
        try {
            const update = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/permissions/update-permission?permissionId=${permissions[0]._id}`,
                permissions[0],
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            if (update.status === 200) {
                console.log(update.data.data);
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
            setError(true);
        }
        setLoading(false);
    };

    // Handle Form Submit
    const handleRoleSubmit = async (event) => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/updateRole/?roleId=${id}`,
                role,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            ).then((response) => {
                if (response.status === 200) {
                    enqueueSnackbar("Update Successfully", { variant: "success" });
                    navigate("/roles/allroles");
                }
            });
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
            setError(true);
        }
        setLoading(false);
    };

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
                                <Header subtitle={"Edit the " + role.name + " Role"} title={"Roles"} />
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
                                            value={role.name}
                                            onChange={(e) => setRole({ ...role, name: e.target.value })}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
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
                                            value={role.description}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
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
                                                Read
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">
                                                Edit
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">
                                                Delete
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    {
                                        permissions.map((per, index) => (
                                            <TableBody
                                                key={per._id}>
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
                                                            checked={per.users.create}
                                                            name="users.create"
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].users.create = !newPermissions[index].users.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.users.read}
                                                            name="user.read"
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].users.read = !newPermissions[index].users.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />

                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.users.update}
                                                            name="user.update"
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].users.update = !newPermissions[index].users.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.users.delete}
                                                            name="users.delete"
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].users.delete = !newPermissions[index].users.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ 'aria-label': 'controlled' }}
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
                                                            checked={per.role.create}
                                                            name='role.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].role.create = !newPermissions[index].role.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.role.read}
                                                            name='role.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].role.read = !newPermissions[index].role.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.role.update}
                                                            name='role.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].role.update = !newPermissions[index].role.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.role.delete}
                                                            name='role.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].role.delete = !newPermissions[index].role.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

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
                                                            checked={per.permission.create}
                                                            name='permission.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].permission.create = !newPermissions[index].permission.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.permission.read}
                                                            name='permission.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].permission.read = !newPermissions[index].permission.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.permission.update}
                                                            name='permission.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].permission.update = !newPermissions[index].permission.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.permission.delete}
                                                            name='permission.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].permission.delete = !newPermissions[index].permission.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

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
                                                            checked={per.page.create}
                                                            name='page.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].page.create = !newPermissions[index].page.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.page.read}
                                                            name='page.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].page.read = !newPermissions[index].page.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.page.update}
                                                            name='page.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].page.update = !newPermissions[index].page.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.page.delete}
                                                            name='page.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].page.delete = !newPermissions[index].page.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
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
                                                            checked={per.blogs.create}
                                                            name='blogs.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].blogs.create = !newPermissions[index].blogs.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.blogs.read}
                                                            name='blogs.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].blogs.read = !newPermissions[index].blogs.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.blogs.update}
                                                            name='blogs.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].blogs.update = !newPermissions[index].blogs.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.blogs.delete}
                                                            name='blogs.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].blogs.delete = !newPermissions[index].blogs.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
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
                                                        Blog Categories
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.blogs_cate.create}
                                                            name='blogs_cate.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].blogs_cate.create = !newPermissions[index].blogs_cate.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.blogs_cate.read}
                                                            name='blogs_cate.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].blogs_cate.read = !newPermissions[index].blogs_cate.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.blogs_cate.update}
                                                            name='blogs_cate.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].blogs_cate.update = !newPermissions[index].blogs_cate.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.blogs_cate.delete}
                                                            name='blogs_cate.delete'

                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].blogs_cate.delete = !newPermissions[index].blogs_cate.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
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
                                                            checked={per.product.create}
                                                            name='product.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].product.create = !newPermissions[index].product.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.product.read}
                                                            name='product.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].product.read = !newPermissions[index].product.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.product.update}
                                                            name='product.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].product.update = !newPermissions[index].product.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.product.delete}
                                                            name='product.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].product.delete = !newPermissions[index].product.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
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
                                                        Product Categories
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.product_cate.create}
                                                            name='product_cate.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].product_cate.create = !newPermissions[index].product_cate.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.product_cate.read}
                                                            name='product_cate.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].product_cate.read = !newPermissions[index].product_cate.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.product_cate.update}
                                                            name='product_cate.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].product_cate.update = !newPermissions[index].product_cate.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.product_cate.delete}
                                                            name='product_cate.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];

                                                                    newPermissions[index].product_cate.delete = !newPermissions[index].product_cate.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
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
                                                            checked={per.coupon.create}
                                                            name='coupon.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].coupon.create = !newPermissions[index].coupon.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.coupon.read}
                                                            name='coupon.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].coupon.read = !newPermissions[index].coupon.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.coupon.update}
                                                            name='coupon.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].coupon.update = !newPermissions[index].coupon.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.coupon.delete}
                                                            name='coupon.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].coupon.delete = !newPermissions[index].coupon.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
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
                                                            checked={per.ticket.create}
                                                            name='ticket.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].ticket.create = !newPermissions[index].ticket.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.ticket.read}
                                                            name='ticket.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].ticket.read = !newPermissions[index].ticket.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.ticket.update}
                                                            name='ticket.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].ticket.update = !newPermissions[index].ticket.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.ticket.delete}
                                                            name='ticket.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].ticket.delete = !newPermissions[index].ticket.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
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
                                                            checked={per.faq.create}
                                                            name='faq.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].faq.create = !newPermissions[index].faq.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.faq.read}
                                                            name='faq.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].faq.read = !newPermissions[index].faq.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.faq.update}
                                                            name='faq.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].faq.update = !newPermissions[index].faq.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.faq.delete}
                                                            name='faq.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].faq.delete = !newPermissions[index].faq.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
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
                                                            checked={per.faq_cate.create}
                                                            name='faq_cate.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].faq_cate.create = !newPermissions[index].faq_cate.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.faq_cate.read}
                                                            name='faq_cate.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].faq_cate.read = !newPermissions[index].faq_cate.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.faq_cate.update}
                                                            name='faq_cate.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].faq_cate.update = !newPermissions[index].faq_cate.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.faq_cate.delete}
                                                            name='faq_cate.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].faq_cate.delete = !newPermissions[index].faq_cate.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
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
                                                            checked={per.orders.create}
                                                            name='orders.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].orders.create = !newPermissions[index].orders.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.orders.read}
                                                            name='orders.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].orders.read = !newPermissions[index].orders.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.orders.update}
                                                            name='orders.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].orders.update = !newPermissions[index].orders.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.orders.delete}
                                                            name='orders.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].orders.delete = !newPermissions[index].orders.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
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
                                                            checked={per.testimonial.create}
                                                            name='testimonial.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].testimonial.create = !newPermissions[index].testimonial.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.testimonial.read}
                                                            name='testimonial.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].testimonial.read = !newPermissions[index].testimonial.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.testimonial.update}
                                                            name='testimonial.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].testimonial.update = !newPermissions[index].testimonial.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.testimonial.delete}
                                                            name='testimonial.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].testimonial.delete = !newPermissions[index].testimonial.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}

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
                                                        Pricing Rules
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.priceRules.create}
                                                            name='priceRules.create'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].priceRules.create = !newPermissions[index].priceRules.create;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.priceRules.read}
                                                            name='priceRules.read'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].priceRules.read = !newPermissions[index].priceRules.read;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.priceRules.update}
                                                            name='priceRules.update'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].priceRules.update = !newPermissions[index].priceRules.update;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={per.priceRules.delete}
                                                            name='priceRules.delete'
                                                            onChange={(e) => {
                                                                setPermissions(prevState => {
                                                                    const newPermissions = [...prevState];
                                                                    newPermissions[index].priceRules.delete = !newPermissions[index].priceRules.delete;
                                                                    return newPermissions;
                                                                });
                                                                console.log(permissions)
                                                            }}
                                                            inputProps={{ "aria-label": "controlled" }}
                                                        />
                                                    </TableCell>
                                                </TableRow>


                                            </TableBody>

                                        ))
                                    }







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
                                    handleRoleSubmit();
                                    updateRolePermissions();
                                }}>
                                    Update Role
                                </Button>
                            </Box>

                        </form>
                    </Box>
                </Box>
            </Box>
        </div>
    )

}

export default EditRole;
