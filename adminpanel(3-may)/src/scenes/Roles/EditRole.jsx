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
        name: '',
        description: '',
    });

    // State varialbles for Permissions
    const [permission, setPermission] = useState([]);
    const [permissions, setPermissions] = useState([]);

    // Get role details
    const getRole = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/getOneRole?roleId=${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            if (response.status === 200) {
                setRole(response.data.data);
                setPermission(response.data.data.permissions);
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
            setError(true);
        }
        setLoading(false);
    }

    //Call getRole function
    useEffect(() => {
        getRole();
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , []);

    // Handle Form Submit
    const handleFormSubmit = async (event) => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/updateRole/?roleId=${id}`, role, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            }).then((response) => {
                if (response.status === 200) {
                    enqueueSnackbar("Update Successfully", { variant: 'success' });
                    setPermission(response.data.permission)

                    navigate('/roles/allroles');
                }
            });
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
            setError(true);
        }
        setLoading(false);
    }

    // Handle Permission Change
    const handlePermissionChange = (event) => {
        const { checked, value } = event.target;
        if (checked) {
            setPermission([...permission, value]);
        } else {
            setPermission(permission.filter((permission) => permission !== value));
        }
    }

    // Update Role Permissions by Role ID
    const updateRolePermissions = async () => {
        setLoading(true);
        setError(false);
        try {
            const update = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/permissions/update-permission/?permissionId=${permission._id}`)
            if (update.status === 200) {
                enqueueSnackbar("Update Successfully", { variant: 'success' });
                navigate('/roles/allroles');
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
            setError(true);
        }
        setLoading(false);
    }


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
                                                    checked={permission.}
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
                                    handleFormSubmit();
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

export default EditRole;
