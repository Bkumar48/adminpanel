import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import CreateIcon from "@mui/icons-material/Create";

const TestimonialList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [testimonials, setTestimonials] = useState([]);
  const [faqCategories, setFaqCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchTestimonials = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Token not found in session storage");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/vi/admin/testimonial/getAll?limit&skip&search=`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTestimonials(res.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Token not found in session storage");
      setLoading(false);
      return;
    }

    try {
      axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/vi/admin/testimonial/deleted?testID=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("FAQ deleted successfully");
      setLoading(false);
      const newTestimonials = testimonials.filter((item) => item._id !== id);
      setTestimonials(newTestimonials);
      enqueueSnackbar("Testimonial deleted successfully", { variant: "success" });
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 110 },
    {
      field: "title",
      headerName: "Title",
      //   width: 270,
      flex: 1,
      editable: true,
    },

    {
      field: "status",
      headerName: "Status",
      //   width: 120,
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
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          width="100%"
        >
          <Button
            variant="contained"
            color="success"
            title="Edit"
            size="small"
            LinkComponent={Link}
            to={`/testimonials/edittestimonial/${params.row.id}`}
          >
            <CreateIcon />
            Edit
          </Button>

          <Button
            variant="contained"
            color="error"
            title="Delete"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteForeverIcon />
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const rows = testimonials.map((test) => {
    return {
      id: test._id,
      title: test.title,
      status: test.status == true ? "Active" : "Inactive",
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
        <Header title="Testimonials" subtitle="Testimonials List" />
        <Button
          variant="contained"
          color="success"
          title="Add Question"
          size="small"
          LinkComponent={Link}
          to="/testimonials/addtestimonial"
        >
          Add Testimonial
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

export default TestimonialList;
