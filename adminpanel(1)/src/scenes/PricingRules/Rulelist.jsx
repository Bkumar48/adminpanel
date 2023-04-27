import { Box, Button, useTheme, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import CreateIcon from "@mui/icons-material/Create";

const RuleList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rules, setRules] = useState([]);
  //   const[search,setSearch]=useState([]);
  const [filter, setFilter] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  //   let rowId = "";
  //   const handleChange = async (e) =>{
  //     e.preventDefault();
  //     const update = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/pricerules/updatePriceRules?rulesId=${rowId}`,{
  //         status: status,
  //     },{
  //         headers: {
  //             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //             },

  //     })
  //     .then((res) => {
  //         fetchRules();
  //         enqueueSnackbar("Updated Successfully", {
  //           variant: "success",
  //         });
  //       }
  //     )
  //     .catch((err) => {
  //         console.log(err);
  //         enqueueSnackbar(err.message, {
  //           variant: "error",
  //         });
  //       }
  //     );
  //   }

  const fetchRules = async () => {
    try {
      const getRules = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/admin/pricerules/getAll`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          setRules(res.data.data);
        } catch (error) {
          console.log(error);
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        }
      };
      getRules();
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deleteRule = async () => {
        await axios
          .delete(
            `${process.env.REACT_APP_BASE_URL}/api/v1/admin/pricerules/deletePriceRule?rulesId=${id}`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            const newRules = rules.filter((category) => category.id !== id);
            fetchRules(newRules);
            enqueueSnackbar("Deleted Successfully", {
              variant: "success",
            });
          });
      };
      deleteRule();
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    }
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "product_id", headerName: "Applied On", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Active", "Inactive"],
      renderCell: ({ row: { status } }) => (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p="5px"
          backgroundColor={
            status === "Active"
              ? colors.greenAccent[100]
              : colors.redAccent[600]
          }
          borderRadius={"4px"}
          //   onChange={(e)=>{handleChange(e), rowId=row.rowId}}
        >
          <Typography variant={"body2"} color={colors.grey[100]}>
            {status == true ? "Active" : "Inactive"}
          </Typography>
        </Box>
      ),
    },
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
              to={`/products/editproduct/${params.row.id}`}
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

  const rows = rules.map((rule) => {
    let productName = [];
    if (rule.product_id.length > 0) {
      for (let i = 0; i < rule.product_id.length; i++) {
        productName.push(rule.product_id[i].title);
      }
    }

    return {
      id: rule._id,
      title: rule.title,
      product_id: productName.join(" , "),
      status: rule.status,
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
        <Header title="Product Pricing " subtitle="All Rules listed here" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            m: "20px 0 0 0",
          }}
        ></Box>

        <Button
          variant="contained"
          color="success"
          LinkComponent={Link}
          //   to="/products/addproduct"
        >
          Add New Rule
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

export default RuleList;
