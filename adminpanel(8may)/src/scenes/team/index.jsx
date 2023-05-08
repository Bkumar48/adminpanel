import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";
const Team = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Fecth all users
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/all-users`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.data);
        setRole(res.data.data[0]?.role[0]); // set the first role object of the first user object
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //  Delete User
  const handleDelete = (_id) => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/v1/user/delUser/?userId=${_id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        enqueueSnackbar("Deleted Successfully", {
          variant: "success",
        }); //
        const newUsers = users.filter((user) => user._id !== _id);
        setUsers(newUsers);
        return res.data;
      })
      .catch((err) => {
        enqueueSnackbar("Delete Failed", {
          variant: "error",
        });
        console.log(err);
      });
  };

  // ***********************************************Role Change Section******************************************************************//

  const [roleList, setRoleList] = useState([]);

  // fetch all roles
  useEffect(() => {
    const getRoles = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/all`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setRoleList(res.data.data);
    };
    getRoles();
  }, []);


  // Push role to user
  const [roleId, setRoleId] = useState("");
  const [userId, setUserId] = useState("");

  const handleRoleChange = async () => {
    
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/pushRoleToUser`, {
        userId : userId,
        roleId : roleId,
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      enqueueSnackbar("Role Changed Successfully", {
        variant: "success",
      });
      const newUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, role: roleId };
        }
        return user;
      });
      setUsers(newUsers);
    } catch (error) {
      console.log(error.response.data);
      enqueueSnackbar("Role Change Failed", {
        variant: "error",
      });
    }
  };




  const columns = [
    { field: "_id", headerName: "ID", flex: 1, },
    {
      field: "userName",
      headerName: "Username",
      flex: 1,
      editable: true,
      width: 100,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      editable: true,
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Phone Number",
      editable: true,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      type: "singleSelect",
      editable: true,
      valueOptions: roleList.map((role) =>  {
        return {  key:role._id, value: role.name, label: role.name };
      }),   
      onchange: (e) => {
        setRoleId(e.key);
        setUserId(e.row._id);
        
        const newUsers = users.map((user) => {
          if (user._id === e.row._id) {
            return { ...user, role: e.value };
          }
          return user;
        });
        setUsers(newUsers);
        handleRoleChange();
      },

      renderCell: ({ row: { role } }) => {
        return (
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
          >
            <Typography variant="body2" color="textSecondary">
              {role[0]?.name}
            </Typography>
          </Box>
        );
      }

    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { _id, name, email, mobile, access, status } }) => {
        return (
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
          >
            <Button
              variant="contained"
              color="success"
              size="small"
              LinkComponent={Link}
              to={`/user/update/${_id}`}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                handleDelete(_id);
              }}
            >
              Delete
            </Button>

          </Box>
        );
      },
    },
  ];

  return (
    <Box
      m="20px"
      sx={{
        width: isMobile ? "100%" : "95%",
      }}
    >
      <Box
        m="20px 0 0 0"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="Users" subtitle="Managing the Team Members" />
        <Button
          variant="contained"
          color="success"
          title="Add User"
          size="small"
          href="/add-user"
        >
          Add User
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
          rows={users}
          getRowId={(users) => users._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Team;