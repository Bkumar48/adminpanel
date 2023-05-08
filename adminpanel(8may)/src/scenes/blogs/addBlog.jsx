import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { deleteBlog } from "../../redux/apiActions";
import { useSelector } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const AddBlog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAddBlog = (values) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/blog/create-blog`, {
        title: values.title,
        description: values.description,
        category: values.category,
        slug: values.slug,
        image : values.image,
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })

      .then((res) => {
        setSuccess(res.data);
        setLoading(false);
        enqueueSnackbar("Blog added successfully", { variant: "success" });
        setTimeout(() => {
          navigate("/blogs");
        }, 500);

      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
        enqueueSnackbar(err.response.message, { variant: "error" });
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/blogcate/getallcate`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <Box
        sx={{
          backgroundColor: colors.background,
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.white,
              borderRadius: 1,
              boxShadow: 1,
              p: 3,
              width: isMobile ? "100%" : "95%",
            }}
          >
            <Formik
              initialValues={{
                title: "",
                description: "",
                category: "",
                slug: "",
                image: "",
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string().max(255).required("Title is required"),
                description: Yup.string()
                  .max(255)
                  .required("Description is required"),
                category: Yup.string()
                  .max(255)
                  .required("Category is required"),
                slug: Yup.string().max(255).required("Slug is required"),
              })}
              onSubmit={handleAddBlog}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Header title="Add Blog" subtitle="Add a new blogs here" />

                  <Box >
                    <TextField
                      error={Boolean(touched.title && errors.title)}
                      fullWidth
                      helperText={touched.title && errors.title}
                      label="Title"
                      margin="normal"
                      name="title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title}
                      variant="outlined"
                    />
                  </Box>
                  <Box >
                    <TextField
                      multiline
                      rows={4}
                      placeholder="Description"
                      error={Boolean(touched.description && errors.description)}
                      fullWidth
                      helperText={touched.description && errors.description}
                      label="Description"
                      margin="normal"
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      variant="outlined"
                    />
                  </Box>
                  <Box >
                    <TextField
                      error={Boolean(touched.category && errors.category)}
                      fullWidth
                      helperText={touched.category && errors.category}
                      label="Category"
                      margin="normal"
                      name="category"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.category}
                      variant="outlined"
                      select
                    >
                      {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.category}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Box >
                    <TextField
                      error={Boolean(touched.slug && errors.slug)}
                      fullWidth
                      helperText={touched.slug && errors.slug}
                      label="Slug"
                      margin="normal"
                      name="slug"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.slug}
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <TextField
                      error={Boolean(touched.image && errors.image)}
                      fullWidth
                      helperText={touched.image && errors.image}
                      label="Image"
                      margin="normal"
                      name="image"
                      onBlur={handleBlur}
                      onChange={(e) => { setFieldValue ("image", e.target.files[0]) }}
                      type="file"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    >


                    </TextField>
                  </Box>
                  <Box
                    display={{ xs: "block", sm: "flex" }}
                    justifyContent="space-between"

                    sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Add Blog
                    </Button>
                    <Link to="/blogs">
                      <Button
                        color="error"
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </Link>

                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AddBlog;
