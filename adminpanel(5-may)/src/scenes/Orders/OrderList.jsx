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

const OrdersList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);
  //   const[search,setSearch]=useState([]);
  const [filter, setFilter] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleFilter = () => {
    const filtered = orders.filter((order) => {
      return (
        order.orderId.toString().includes(filter.toString()) ||
        // order.userId.firstName + "" + order.userId.lastName.toString().includes(filter.toString()) ||
        // order.txId.toString().includes(filter.toString()) ||
        // order.amount.toString().includes(filter.toString()) ||
        // order.bitcoinAmountReceive.toString().includes(filter.toString()) ||
        // order.date.toString().includes(filter.toString()) ||
        // order.paymentMethod.toString().includes(filter.toString())
        order.payment_status.includes(filter) ||
        order.orderstatus.includes(filter)
      );
    });
    setOrders(filtered);
  };

  const fetchOrders = async () => {
    try {
      const getOrders = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/admin/order/getAllOrders?startDate=&endtDate=&limit&skip&orderno=&userMail=&order_status=&payment_status&payment_method=`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          setOrders(res.data.data);
        } catch (error) {
          console.log(error);
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        }
      };
      getOrders();
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deleteCategory = async () => {
        await axios
          .delete(
            `${process.env.REACT_APP_BASE_URL}/api/v1/product/deletePro?productId=${id}`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            const newOrders = orders.filter((category) => category.id !== id);
            fetchOrders(newOrders);
            enqueueSnackbar("Deleted Successfully", {
              variant: "success",
            });
          });
      };
      deleteCategory();
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    }
  };

  const columns = [
    { field: "orderId", headerName: "Order Id", flex: 0.5 },
    { field: "userId", headerName: "User", flex: 1 },
    { field: "txId", headerName: "Transation Id", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "bitcoinAmountReceive", headerName: "BTC Received", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "paymentMethod",
      headerName: "Payment method",
      flex: 1,
      renderCell: ({ row: { paymentMethod } }) => (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p="5px"
          backgroundColor={
            paymentMethod === "bitcoin"
              ? colors.yellowAccent[100]
              : paymentMethod === "razorpay"
              ? colors.blueAccent[1000]
              : colors.redAccent[600]
          }
          borderRadius={"4px"}
        >
          <Typography
            variant={"body2"}
            color={colors.grey[100]}
            sx={{ textTransform: "capitalize" }}
          >
            {paymentMethod}
          </Typography>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "pending",
        "completed",
        "hold",
        "cancelled",
        "processing",
        "refund",
      ],
      renderCell: ({ row: { status } }) => (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p="5px"
          backgroundColor={
            status === "completed"
              ? colors.greenAccent[600]
              : status === "processing"
              ? colors.yellowAccent[100]
              : status === "hold"
              ? colors.greyAccent[100]
              : status === "cancelled"
              ? colors.redAccent[600]
              : status === "refund"
              ? colors.blueAccent[1000]
              : colors.redAccent[600]
          }
          borderRadius={"4px"}
        >
          <Typography
            variant={"body2"}
            color={colors.grey[100]}
            sx={{ textTransform: "capitalize" }}
          >
            {status}
          </Typography>
        </Box>
      ),
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["paid", "unpaid"],
      renderCell: ({ row: { paymentStatus } }) => (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p="5px"
          backgroundColor={
            paymentStatus === "paid"
              ? colors.greenAccent[600]
              : colors.redAccent[600]
          }
          borderRadius={"4px"}
        >
          <Typography
            variant={"body2"}
            color={colors.grey[100]}
            sx={{ textTransform: "capitalize" }}
          >
            {paymentStatus}
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

  const rows = orders.map((order) => {
    const date = new Date(order.createdAt);
    const newDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    order.createdAt = newDate;

    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    order.createdAt = newDate + " " + time;

    return {
      id: order._id,
      userId: order.userId.firstName + " " + order.userId.lastName,
      orderId: order.orderId,
      txId: order.txId,
      amount: order.amount,
      bitcoinAmountReceive: order.bitcoinAmountReceive,
      date: order.createdAt,
      paymentMethod: order.payment_method,
      status: order.orderstatus,
      paymentStatus: order.payment_status,
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
        <Header title="Orders" subtitle="All Orders listed here " />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            m: "20px 0 0 0",
          }}
        >
          {/* <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
            sx={{
                mr: "10px",
            }}
            onChange={(e) => setSearch(e.target.value)}
            /> */}
          <TextField
            id="outlined-basic"
            label="Filter"
            variant="outlined"
            size="small"
            sx={{
              mr: "10px",
            }}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button variant="contained" color="success" onClick={handleFilter}>
            Filter
          </Button>
        </Box>

        {/* <Button
          variant="contained"
          color="success"
          LinkComponent={Link}
          to="/products/addproduct"
        >
          Add Product
        </Button> */}
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

export default OrdersList;
