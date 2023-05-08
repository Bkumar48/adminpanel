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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const CouponAdd = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    const date = values.expire;
    const [day, month, year] = date.split('-');
    const dateStr = `${year}-${month}-${day}`.toString().slice(0, 10);
    console.log(dateStr);
    values.expire = dateStr;

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/admin/coupon/create`,
        {
          code: values.code,
          discount: values.discount,
          discountType: values.discountType,
          expire: values.expire,
          copounUsed: values.couponUsed,
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
        navigate("/coupon/couponslist");
        enqueueSnackbar("Coupon added successfully", { variant: "success" });
      })
      .catch((err) => {
        console.error(values);
        setLoading(false);
        setError(true);
        enqueueSnackbar(err, { variant: "error" });
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
                code: "",
                discount: "",
                discountType: "",
                expire: "",
                couponUsed: "",
              }}
              validationSchema={Yup.object().shape({
                code: Yup.string()
                  .max(255)
                  .required("Code is required"),
                discount: Yup.string()
                  .max(255)
                  .required("Discount is required"),
                couponUsed: Yup.string()
                  .max(255)
                  .required("Coupon Used is required"),
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
                      <Header subtitle={"Add New Coupon"} title={"Coupons"} />
                    </Box>
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                          <TextField
                            error={Boolean(touched.code && errors.code)}
                            fullWidth
                            helperText={touched.code && errors.code}
                            label="Code"
                            name="code"
                            size="small"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.code}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            error={Boolean(touched.discount && errors.discount)}
                            fullWidth
                            helperText={touched.discount && errors.discount}
                            label="Discount"
                            name="discount"
                            size="small"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.discount}
                            variant="outlined"

                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            error={Boolean(touched.expire && errors.expire)}
                            fullWidth
                            helperText={touched.expire && errors.expire}
                            label="Expiraton Date"
                            name="expire"
                            size="small"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.expire}
                            variant="outlined"
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          {/* {console.log(values.expire)} */}
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.couponUsed && errors.couponUsed
                            )}
                            fullWidth
                            helperText={touched.couponUsed && errors.couponUsed}
                            label="Limit To be Used"
                            name="couponUsed"
                            size="small"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.couponUsed}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              Discount Type
                            </FormLabel>
                            <RadioGroup
                              row
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Grid
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  mr: 5,
                                }}
                              >
                                <Field
                                  type="radio"
                                  name="discountType"
                                  value="1"
                                />
                                <Typography
                                  sx={{
                                    ml: 1,
                                  }}
                                >
                                  Percent
                                </Typography>
                              </Grid>
                              <Grid
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Field
                                  type="radio"
                                  name="discountType"
                                  value="2"
                                />
                                <Typography
                                  sx={{
                                    ml: 1,
                                  }}
                                >
                                  Fixed
                                </Typography>
                              </Grid>
                            </RadioGroup>
                          </FormControl>
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
                        Add Coupon
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
export default CouponAdd;
