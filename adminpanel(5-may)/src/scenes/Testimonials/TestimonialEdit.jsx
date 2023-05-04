import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useFormik } from "formik";
import * as Yup from "yup";
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
} from "@mui/material";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
const TestimonialEdit = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const [testimonial, setTestimonial] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fetchTestimonial = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Token not found in session storage");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/vi/admin/testimonial/get?testID=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTestimonial(res.data.data);
      setTitle(res.data.data.title);
      setDescription(res.data.data.description);
      setRating(res.data.data.rating);
      setImage(res.data.data.image);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonial();
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
        `${process.env.REACT_APP_BASE_URL}/api/vi/admin/testimonial/update?testID=${id}`,
        {
          title: title,
          description: description,
          rating: rating,
          image: image,
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
      navigate("/testimonials/testimonialslist", { replace: true });
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
                  <Header subtitle={"Edit Testimonial"} title="Testimonial" />
                </Box>
                  <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        value={title}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        value={description}
                        variant="outlined"
                      />
                    </Grid>
                    {/* <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Rating"
                          name="rating"    
                          onChange={(e) => setRating(e.target.value)}
                          required
                          value={rating}
                          variant="outlined"
                        />
                      </Grid> */}
                  </Grid>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  <Button color="primary" variant="contained" type="submit">
                    Update
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    type="submit"
                    LinkComponent={Link}
                    to={`/testimonials/testimonialslist`}
                  >
                    cancel
                  </Button>
                </Box>
              </Card>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default TestimonialEdit;
