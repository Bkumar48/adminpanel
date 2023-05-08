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

const PagesList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pages, setPages] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchPages = async () => {
    try {
      const getPages = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/pages/pageList`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          setPages(res.data.data);
        } catch (error) {
          console.log(error);
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        }
      };
      getPages();
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);



  const handleDelete = async (id) => {
   try{
    const deletePage = async () => {
       await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/v1/pages/deleteCate?pageId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res)=>{
        const newPages = pages.filter((page) => page.id !== id);
      fetchPages(newPages);
      enqueueSnackbar("Deleted Successfully", {
        variant: "success",
      });
    })
    };
    deletePage();
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
    { field: "title", headerName: "Title", flex: 1 },
    { field: "keyword", headerName: "Keyword", flex: 1},
    { field: "slug", headerName: "Slug", flex: 1},
    { field: "product_status", headerName: "Status", width: 100, editable: true, type:"singleSelect", valueOptions: ["Active", "Inactive"],renderCell: ({row:{product_status}}) => (
        <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        width="60%"
        p="5px"
        backgroundColor={
          product_status === "Active"
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
          {product_status === true ? "Active" : "Inactive"}
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
              to={`/pages/editpage/${params.row.id}`}
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

  const rows = pages.map((page) => {
    return {
      id: page._id,
      title: page.title,
      slug: page.slug,  
        keyword: page.keyword,

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
        <Header title="Pages" subtitle="All Pages listed here " />
        <Button
          variant="contained"
          color="success"
          LinkComponent={Link}
          to="/pages/addpage"
        >
          Add Page
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

export default PagesList;
