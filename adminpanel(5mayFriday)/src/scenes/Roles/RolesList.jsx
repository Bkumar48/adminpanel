import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import CreateIcon from "@mui/icons-material/Create";

const RolesList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [roles, setRoles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchRoles = async () => {
    try {
      const getRoles = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/all`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          setRoles(res.data.data);
        } catch (error) {
          console.log(error);
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        }
      };
      getRoles();
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);



  const handleDelete = async (id) => {
   try{
    const deleteRole = async () => {
       await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/deleteRole?roleId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res)=>{
        const newRoles = roles.filter((role) => role.id !== id);
      fetchRoles(newRoles);
      enqueueSnackbar("Deleted Successfully", {
        variant: "success",
      });
    })
    };
    deleteRole();
    }catch(error){
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    }
   }

  const columns = [ 
    // { field: "icon", headerName: "Icon", width: 100 ,renderCell: (params) => 
      
    //    <img src={params.value} alt="icon" width="30px" height="30px" />
  
    //   },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1},
    { field: "permission", headerName: "Permission", flex: 1},
    { field: "status", headerName: "Status", width: 100, editable: true, type:"singleSelect", valueOptions: ["Active", "Inactive"],renderCell: ({row:{status}}) => (
        <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        width="60%"
        p="5px"
        backgroundColor={
          status === "active"
            ? colors.greenAccent[600]
            : colors.redAccent[600]
        }
        borderRadius={"4px"}
      >
        <Typography
          variant={"body2"}
          color={
            colors.grey[100]} sx={{ textTransform: "capitalize" }}
        >
          {status == "1"? "active" : "inactive"}
        </Typography>
      </Box>
  
        )},

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
          >
            <Button
              LinkComponent={Link}
              to={`/roles/editrole/${params.row.id}`}
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<CreateIcon />}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteForeverIcon />}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
           
          </Box>
        );
      },
    },
  ];

  const rows = roles.map((role) => {
    return {
      id: role._id,
      name: role.name,
        description: role.description,
        permission: role.permissions,
        status: role.status,
    };
  });

  return (
    <Box m="20px">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          m: "20px 0 0 0",
        }}
      >
        <Header title="Roles" subtitle="All Roles listed here " />
        <Button
          variant="contained"
          color="success"
          LinkComponent={Link}
          to="/roles/addrole"
        >
          Add Role
        </Button>
      </Box>
      <Box
        m="5px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default RolesList;
