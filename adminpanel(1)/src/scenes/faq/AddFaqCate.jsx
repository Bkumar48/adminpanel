import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const AddFaq = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const enqueueSnackbar = useSnackbar();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    axios
      .post(
        `http://localhost:5000/api/v1/faq/faqCateAdd`,
        {
          cate_name: values.title,
          description: values.description,
          slug: values.slug,
          image: values.image,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        navigate("/faqs/faqcategorieslist");
        enqueueSnackbar("Faq Category added successfully", { variant: "success" });
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        enqueueSnackbar("Something went wrong", { variant: "error" });
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
            p: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.white,
              borderRadius: 1,
              boxShadow: 5,
              width: isMobile ? "100%" : "50%",
            }}
          >
            <Formik
              initialValues={{
                title: "",
                description: "",
                // slug: "",
                image: "",
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .max(255)
                  .required("Title is required"),
                description: Yup.string()
                  .max(255)
                  .required("Description is required"),
                slug: Yup.string()
                  .max(255)
                  .required("Slug is required"),
              })}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Card>
                    <Box m="15px 0 0 15px">
                      <Header subtitle={"Add Faq Category"} title={"Faq"} />
                    </Box>
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                          <TextField
                            error={Boolean(touched.title && errors.title)}
                            fullWidth
                            helperText={touched.title && errors.title}
                            label="Title"
                            name="title"
                            size="small"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.title}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.description && errors.description
                            )}
                            fullWidth
                            helperText={
                              touched.description && errors.description
                            }
                            label="Description"
                            name="description"
                            size="small"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item md={12} xs={12}>
                          <TextField
                            error={Boolean(touched.image && errors.image)}
                            fullWidth
                            helperText={touched.image && errors.image}
                            label="Image"
                            name="image"
                            size="small"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.image}
                            variant="outlined"
                            type="file"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                            <Grid item md={12} xs={12}>
                              <TextField
                                error={Boolean(touched.slug && errors.slug)}
                                fullWidth
                                helperText={touched.slug && errors.slug}
                                label="Slug"
                                name="slug"
                                size="small"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.slug}
                                variant="outlined"
                              />
                            </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                      }}
                    >
                      <Button color="primary" variant="contained" type="submit">
                        Add Faq
                      </Button>
                    </Box>
                  </Card>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default AddFaq;
