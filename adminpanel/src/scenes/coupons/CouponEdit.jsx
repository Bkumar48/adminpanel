import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import {
  MenuItem,
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
  InputLabel,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
const EditCoupon = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const [faq, setFaq] = useState([]);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expire, setExpire] = useState("");
  const [copounUsed, setCopounUsed] = useState("");
  const [discountType, setDiscountType] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchCoupon = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Token not found in session storage");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/admin/coupon/getSingle?couponId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const date = res.data.data.expire.toLocaleString();
      console.log(date);

      setCode(res.data.data.code);
      setDiscount(res.data.data.discount);
      setExpire(res.data.data.expire);
      setCopounUsed(res.data.data.copounUsed);
      setDiscountType(res.data.data.discountType);

      console.log(res.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupon();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Token not found in session storage");
        setLoading(false);
        return;
      }
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/admin/coupon/update?couponId=${id}`,
        {
          code: code,
          discount: discount,
          expire: expire,
          copounUsed: copounUsed,
          discountType: discountType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar("Updated Successfully", {
        variant: "success",
      });
      navigate("/faqs", { replace: true });
    } catch (error) {
      enqueueSnackbar(error.response, {
        variant: "error",
      });
    }
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
            <form onSubmit={handleSubmit}>
              <Card>
                <Box m="15px 0 0 15px">
                  <Header subtitle={code} title={"Coupon"} />
                </Box>
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Code"
                        name="code"
                        size="small"
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                        value={code}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Discount"
                        name="discount"
                        size="small"
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
                        value={discount}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Expiraton Date"
                        name="expire"
                        size="small"
                        onChange={(e) => {
                          setExpire(e.target.value);
                        }}
                        value={expire}
                        variant="outlined"
                        // type="date"
                        // InputLabelProps={{
                        //   shrink: true,
                        // }}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Limit To be Used"
                        name="couponUsed"
                        size="small"
                        onChange={(e) => {
                          setCopounUsed(e.target.value);
                        }}
                        value={copounUsed}
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
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="1"
                            control={<Radio checked={discountType == "1"} />}
                            label="Percent"
                            onChange={(e)=>{setDiscountType(e.target.value)}}
                            {...console.log(discountType)}
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio checked={discountType == "2"} />}
                            label="Flat"
                            onChange={(e)=>{setDiscountType(e.target.value)}}
                          />
                       
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
            </form>{" "}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default EditCoupon;
