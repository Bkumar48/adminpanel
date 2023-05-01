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
const EditFaq = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const [faq, setFaq] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/product/productCateList`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setParentCategories(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchProdcate = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Token not found in session storage");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/getSingleCate?category_Id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.data);
      setTitle(res.data.data.name);
      setDescription(res.data.data.description);
      setParentId(res.data.data.parent_id);
      setSlug(res.data.data.slug);
      setImage(res.data.data.image);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProdcate();
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
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/updateSingleCate?category_Id=${id}`,
        {
          cate_name: title,
          description: description,
          parent_id: parentId,
          slug: slug,
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
      navigate("/products/productscatelist", { replace: true });
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
                  <Header subtitle={faq.title} title="Edit Faq" />
                  </Box>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Name"
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
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Slug"
                          name="slug"
                          onChange={(e) => setSlug(e.target.value)}
                          required
                          value={slug}
                          variant="outlined"
                        />
                      </Grid>
                      {/* <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Image"
                          name="image"
                          onChange={(e) => setSlug(e.target.files[0])}
                          value={image}
                          variant="outlined"
                          type="file"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid> */}
                      <Grid item md={12} xs={12}>
                        <TextField
                        fullWidth
                        label="Parent Category"
                        name="parentId"
                        onChange={(e)=>{setParentId(e.target.value)}}
                        value={parentId}
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
                      Update Faq
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

export default EditFaq;
