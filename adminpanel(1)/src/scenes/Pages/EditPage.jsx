import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useLocation, useParams } from "react-router-dom";
import { Box, Button, TextField, MenuItem, Divider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const EditPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
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
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const fetchPage = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/pages/getSinglePage?pageId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log(data.data);

      setTitle(data.data[0].title);
      setImage(data.data[0].image);
      setDescription(data.data[0].description);
      setSlug(data.data[0].slug);
      setKeyword(data.data[0].keyword);
      setCanonical(data.data[0].canonical_links);
      setMetaTitle(data.data[0].meta_title);
      setMetaDescription(data.data[0].meta_description);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/pages/updateSinglePage?pageId=${id}`,
        {
          title: title,
          image: image,
          description: description,
          slug: slug,
          keyword: keyword,
          canonical_links: canonical,
          meta_title: metaTitle,
          meta_description: metaDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      setSuccess(data.message);
      enqueueSnackbar("Updated Successfully", { variant: "success" });
      navigate("/pages/pageslist");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchPage();
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
            <form>
              <Header title="Pages" subtitle="Edit a page contents" />
              <Divider />

              <Box>
                <TextField
                  fullWidth
                  label="Title"
                  margin="normal"
                  name="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  variant="outlined"
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Image"
                  margin="normal"
                  name="image"
                  // onChange={(e) => {handleChange(URL.createObjectURL(e.target.files[0]))}}
                  // onChange={handleChange}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  value={image}
                  variant="outlined"
                  type="file"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Description"
                  margin="normal"
                  name="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Slug"
                  margin="normal"
                  name="slug"
                  onChange={(e) => {
                    setSlug(e.target.value);
                  }}
                  value={slug}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Keyword"
                  margin="normal"
                  name="keyword"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  value={keyword}
                  variant="outlined"
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Canonical Links"
                  margin="normal"
                  name="canonical"
                  onChange={(e) => {
                    setCanonical(e.target.value);
                  }}
                  value={canonical}
                  variant="outlined"
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Meta Title"
                  margin="normal"
                  name="metaTitle"
                  onChange={(e) => {
                    setMetaTitle(e.target.value);
                  }}
                  value={metaTitle}
                  variant="outlined"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Meta Description"
                  margin="normal"
                  name="metaDescription"
                  onChange={(e) => {
                    e.preventDefault();
                    setMetaDescription(e.target.value);
                  }}
                  value={metaDescription}
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
                  onClick={handleSubmit}
                >
                  Update Page
                </Button>
                <Link to="/blogs">
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
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default EditPage;
