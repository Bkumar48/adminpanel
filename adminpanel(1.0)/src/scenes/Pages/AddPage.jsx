import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { Box, Button, TextField, Divider } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const AddPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [slug, setSlug] = useState("");
    const [keyword, setKeyword] = useState("");
    const [canonical, setCanonical] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = async (values) => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/pages/pageAdd`,
        {
          title: values.title,
          image: values.image,
          description: values.description,
          slug: values.slug,
          keyword: values.keyword,
          canonical_links: values.canonical,
          meta_title: values.metaTitle,
          meta_description: values.metaDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSuccess(res.data);
        setLoading(false);
        enqueueSnackbar("Page added successfully", { variant: "success" });
        setTimeout(() => {
          navigate("/pages/pageslist");
        }, 500);
      })
      .catch((err) => {
        setError(err);
        console.log(values);
        setLoading(false);
        enqueueSnackbar(error, { variant: "error" });
      });
  };

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
                title: "",
                image: "",
                description: "",
                slug: "",
                keyword: "",
                canonical: "",
                metaTitle: "",
                metaDescription: "",
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .max(255)
                  .required("Title is required"),
                // image: Yup.string().max(255).required("Image is required"),
                description: Yup.string()
                  .max(255)
                  .required("Description is required"),
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
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Header title="Pages" subtitle="Add a new page here" />
                  <Divider />

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
                      error={Boolean(touched.image && errors.image)}
                      fullWidth
                      helperText={touched.image && errors.image}
                      label="Image"
                      margin="normal"
                      name="image"
                      onBlur={handleBlur}
                      // onChange={(e) => {handleChange(URL.createObjectURL(e.target.files[0]))}}
                      // onChange={handleChange}
                      onChange={(e) => {
                        setFieldValue("image", e.currentTarget.files[0]);
                      }}
                      value={values.image}
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
                      // disabled={isSubmitting}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Add Page
                    </Button>
                    <Link to="/pages/pageslist">
                      <Button
                        color="error"
                        // disabled={isSubmitting}
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

export default AddPage;
