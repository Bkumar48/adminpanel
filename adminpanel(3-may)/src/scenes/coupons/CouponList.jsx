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

const CouponList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [coupons, setCoupons] = useState([]);
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

  const fetchCoupons = async () => {
    try {
      const getCoupons = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/admin/coupon/getall?limit&skip&expiryStatus=&coupon=&expiryStatus`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          setCoupons(res.data.data);
        } catch (error) {
          console.log(error);
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        }
      };
      getCoupons();
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deleteCoupon = async () => {
        await axios
          .delete(
            `${process.env.REACT_APP_BASE_URL}/api/v1/admin/coupon/delete?couponId=${id}`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            const newCoupons = coupons.filter((coupon) => coupon.id !== id);
            fetchCoupons(newCoupons);
            enqueueSnackbar("Deleted Successfully", {
              variant: "success",
            });
          });
      };
      deleteCoupon();
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    }
  };

  const columns = [
    { field: "code", headerName: "Code", flex: 1 },
    { field: "discount", headerName: "Discount", flex: 1 },
    { field: "created", headerName: "Created On", flex: 1 },
    { field: "expiration", headerName: "Expiration Date", flex: 1 },
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
              ? colors.greenAccent[600]
              : colors.redAccent[600]
          }
          borderRadius={"4px"}
          //   onChange={(e)=>{handleChange(e), rowId=row.rowId}}
        >
          <Typography variant={"body2"} color={colors.grey[100]}>
            {status}
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
              to={`/coupon/editcoupon/${params.row.id}`}
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

  const rows = coupons.map((coupon) => {
    return {
      id: coupon._id,
        code: coupon.code,
        discount: coupon.discountType == 1 ? `${coupon.discount}%` : `₹${coupon.discount}`,
        created: coupon.createdAt,
        status: coupon.status == true ? "Active" : "Inactive",
        expiration: coupon.expire,

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
        <Header title="Coupons " subtitle="All Coupons listed here" />
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
            to="/coupon/addcoupon"
        >
          Add New Coupon
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

export default CouponList;
