import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { Box, Button, TextField, MenuItem, Divider } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const AddProduct = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = async (values) => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/productAdd`,
        {
          banner_title: values.bannertitle,
          title: values.title,
          strip_color: values.stripColor,
          main_cate_id: values.parentCategory,
          parent_cate_id: values.subCategory,
          product_tag: values.producttag,
          image: values.image,
          description: values.description,
          stock: values.stock,
          min_qty: values.minQty,
          price: values.price,
          slug: values.slug,
          keyword: values.keyword,
          canonical_links: values.canonical,
          meta_title: values.metaTitle,
          meta_description: values.metaDescription,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSuccess(res.data);
        setLoading(false);
        enqueueSnackbar("Product added successfully", { variant: "success" });
        setTimeout(() => {
          navigate("/products/productslist");
        }, 500);
      })
      .catch((err) => {
        setError(err.data);
        console.log(values)
        setLoading(false);
        enqueueSnackbar(err, { variant: "error" });
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/product/productCateList`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setParentCategories(res.data.data);
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
            justifyContent: "start",
            ml: "8%",
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.white,
              borderRadius: 1,
              boxShadow: 5,
              p: 3,
              width: isMobile ? "100%" : "60%",
            }}
          >
            <Formik
              initialValues={{
                bannertitle: "",
                title: "",
                stripColor: "#000000",
                parentCategory: "",
                subCategory: "",
                producttag: "",
                image: '',
                description: "",
                stock: "",
                minQty: "",
                price: "",
                slug: "",
                keyword: "",
                canonical: "",
                metaTitle: "",
                metaDescription: "",
              }}
              validationSchema={Yup.object().shape({
                bannertitle: Yup.string()
                  .max(255)
                  .required("Banner Title is required"),
                title: Yup.string()
                  .max(255)
                  .required("Title is required"),
                stripColor: Yup.string()
                  .max(255)
                  .required("Strip Color is required"),
                parentCategory: Yup.string()
                  .max(255)
                  .required("Parent Category is required"),
                producttag: Yup.string()
                  .max(255)
                  .required("Product Tag is required"),
                // image: Yup.string().max(255).required("Image is required"),
                description: Yup.string()
                  .max(255)
                  .required("Description is required"),
                stock: Yup.string()
                  .max(255)
                  .required("Stock is required"),
                minQty: Yup.string()
                  .max(255)
                  .required("Min Qty is required"),
                price: Yup.string()
                  .max(255)
                  .required("Price is required"),
                slug: Yup.string()
                  .max(255)
                  .required("Slug is required"),
                keyword: Yup.string()
                  .max(255)
                  .required("Keyword is required"),
                canonical: Yup.string()
                  .max(255)
                  .required("Canonical is required"),
                metaTitle: Yup.string()
                  .max(255)
                  .required("Meta Title is required"),
                metaDescription: Yup.string()
                  .max(255)
                  .required("Meta Description is required"),
              })}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
                setFieldValue
              }) => (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Header title="Product" subtitle="Add a new blogs here" />
                  <Divider />
                  <Box sx={{ mt: 3 }}>
                    <TextField
                      error={Boolean(touched.bannertitle && errors.bannertitle)}
                      fullWidth
                      helperText={touched.bannertitle && errors.bannertitle}
                      label="Banner Title"
                      margin="normal"
                      name="bannertitle"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bannertitle}
                      variant="outlined"
                    />
                  </Box>

                  <Box>
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

                  <Box>
                    <TextField
                      error={Boolean(touched.stripColor && errors.stripColor)}
                      fullWidth
                      helperText={touched.stripColor && errors.stripColor}
                      label="Strip Color"
                      margin="normal"
                      name="stripColor"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.stripColor}
                      variant="outlined"
                      type="color"
                    />
                  </Box>

                  <Box>
                    <TextField
                      error={Boolean(
                        touched.parentCategory && errors.parentCategory
                      )}
                      fullWidth
                      helperText={
                        touched.parentCategory && errors.parentCategory
                      }
                      label="Parent Category"
                      margin="normal"
                      name="parentCategory"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.parentCategory}
                      variant="outlined"
                      select
                    >
                      {parentCategories
                        .filter((option) => option.parent_id == 0)
                        .map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Box>
                  {values.parentCategory && (
                    <Box>
                      <TextField
                        error={Boolean(
                          touched.subCategory && errors.subCategory
                        )}
                        fullWidth
                        helperText={touched.subCategory && errors.subCategory}
                        label="Sub Category"
                        margin="normal"
                        name="subCategory"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.subCategory}
                        variant="outlined"
                        select
                      >
                        {parentCategories
                          .filter(
                            (option) => option.parent_id == values.parentCategory
                          )
                          .map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Box>
                  )}

                  <Box>
                    <TextField
                      error={Boolean(touched.producttag && errors.producttag)}
                      fullWidth
                      helperText={touched.producttag && errors.producttag}
                      label="Product Tag"
                      margin="normal"
                      name="producttag"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.producttag}
                      variant="outlined"
                      select
                    >
                      <MenuItem value="fresh">Fresh</MenuItem>
                      <MenuItem value="pva">PVA</MenuItem>
                      <MenuItem value="aged">Aged</MenuItem>
                    </TextField>
                  </Box>

                  <Box>
                    <TextField
                      error={Boolean(touched.image && errors.image)}
                      fullWidth
                      helperText={touched.image && errors.image}
                      label="Image"
                      margin="normal"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
                      variant="outlined"
                      type="file"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>

                  <Box>
                    <TextField
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
                      multiline
                      rows={4}
                    />
                  </Box>

                  <Box>
                    <TextField
                      error={Boolean(touched.stock && errors.stock)}
                      fullWidth
                      helperText={touched.stock && errors.stock}
                      label="Stock"
                      margin="normal"
                      name="stock"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.stock}
                      variant="outlined"
                      type="number"
                    />
                  </Box>
                  <Box>
                    <TextField
                      error={Boolean(touched.minQty && errors.minQty)}
                      fullWidth
                      helperText={touched.minQty && errors.minQty}
                      label="Min Qty"
                      margin="normal"
                      name="minQty"
                      value={values.minQty}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      type="number"
                    />
                  </Box>
                  <Box>
                    <TextField
                      error={Boolean(touched.price && errors.price)}
                      fullWidth
                      helperText={touched.price && errors.price}
                      label="Price"
                      margin="normal"
                      name="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.price}
                      variant="outlined"
                      type="number"
                    />
                  </Box>

                  <Box>
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
                    />
                  </Box>

                  <Box>
                    <TextField
                      error={Boolean(touched.keyword && errors.keyword)}
                      fullWidth
                      helperText={touched.keyword && errors.keyword}
                      label="Keyword"
                      margin="normal"
                      name="keyword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.keyword}
                      variant="outlined"
                    />
                  </Box>

                  <Box>
                    <TextField
                      error={Boolean(touched.canonical && errors.canonical)}
                      fullWidth
                      helperText={touched.canonical && errors.canonical}
                      label="Canonical Links"
                      margin="normal"
                      name="canonical"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.canonical}
                      variant="outlined"
                    />
                  </Box>

                  <Box>
                    <TextField
                      error={Boolean(touched.metaTitle && errors.metaTitle)}
                      fullWidth
                      helperText={touched.metaTitle && errors.metaTitle}
                      label="Meta Title"
                      margin="normal"
                      name="metaTitle"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.metaTitle}
                      variant="outlined"
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <TextField
                      error={Boolean(
                        touched.metaDescription && errors.metaDescription
                      )}
                      fullWidth
                      helperText={
                        touched.metaDescription && errors.metaDescription
                      }
                      label="Meta Description"
                      margin="normal"
                      name="metaDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.metaDescription}
                      variant="outlined"
                    />
                  </Box>

                  <Divider />

                  <Box
                    display={{ xs: "block", sm: "flex" }}
                    justifyContent="space-between"
                    sx={{ py: 2, mt: 3 }}
                  >
                    <Button
                      color="primary"
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Add Product
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

export default AddProduct;



















