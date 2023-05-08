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

const EditProduct = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const [bannertitle, setBannerTitle] = useState("");
  const [title, setTitle] = useState("");
  const [stripColor, setStripColor] = useState("#000000");
  const [parentCategory, setParentCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [producttag, setProductTag] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [minQty, setMinQty] = useState("");
  const [price, setPrice] = useState("");
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
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/getSingleProduct?productId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      setBannerTitle(data.dataProduct.banner_title);
      setTitle(data.dataProduct.title);
      setStripColor(data.dataProduct.strip_color);
      setParentCategory(data.dataProduct.main_cate_id);
      setSubCategory(data.dataProduct.parent_cate_id);
      setProductTag(data.dataProduct.product_tag);
      setImage(data.dataProduct.image);
      setDescription(data.dataProduct.description);
      setStock(data.dataProduct.stock);
      setMinQty(data.dataProduct.min_qty);
      setPrice(data.dataProduct.price);
      setSlug(data.dataProduct.slug);
      setKeyword(data.dataProduct.keyword);
      setCanonical(data.dataProduct.canonical_links);
      setMetaTitle(data.dataProduct.meta_title);
      setMetaDescription(data.dataProduct.meta_description);
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
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/updateProduct?productId=${id}`,
        {
          banner_title: bannertitle,
          title: title,
          strip_color: stripColor,
          main_cate_id: parentCategory,
          parent_cate_id: subCategory,
          product_tag: producttag,
          image: image,
          description: description,
          stock: stock,
          min_qty: minQty,
          price: price,
          slug: slug,
          keyword: keyword,
          canonical_links: canonical,
          meta_title: metaTitle,
          meta_description: metaDescription,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      setSuccess(data.message);
      enqueueSnackbar("Updated Successfully", { variant: "success" });
      navigate("/products/productslist");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  const fetchParentCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/productCateList`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setParentCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/productCateList`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setSubCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchParentCategories();
    fetchSubCategories();
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
              <Header title="Products" subtitle="Edit Product  " />
              <Divider />
              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Banner Title"
                  margin="normal"
                  name="bannertitle"
                  onChange={(e) => {
                    setBannerTitle(e.target.value);
                  }}
                  value={bannertitle}
                  variant="outlined"
                />
              </Box>

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
                  label="Strip Color"
                  margin="normal"
                  name="stripColor"
                  onChange={(e) => {
                    setStripColor(e.target.value);
                  }}
                  value={stripColor}
                  variant="outlined"
                  type="color"
                />
                {/* {console.log(values.stripColor)} */}
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Parent Category"
                  margin="normal"
                  name="parentCategory"
                  onChange={(e) => {
                    setParentCategory(e.target.value);
                  }}
                  value={parentCategory}
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

              {/* {console.log(parentCategory)} */}
              {parentCategory && (
                <Box>
                  <TextField
                    fullWidth
                    label="Sub Category"
                    margin="normal"
                    name="subCategory"
                    onChange={(e) => {
                      setSubCategory(e.target.value);
                    }}
                    value={subCategory}
                    variant="outlined"
                    select
                  >
                    {parentCategories
                      .filter(
                        (option) => option.parent_id == parentCategory
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
                  fullWidth
                  label="Product Tag"
                  margin="normal"
                  name="producttag"
                  onChange={(e) => {
                    setProductTag(e.target.value);
                  }}
                  value={producttag}
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
                  fullWidth
                  label="Image"
                  margin="normal"
                  name="image"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  // value={image[0]}
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
                  label="Stock"
                  margin="normal"
                  name="stock"
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                  value={stock}
                  variant="outlined"
                  type="number"
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Min Qty"
                  margin="normal"
                  name="minQty"
                  value={minQty}
                  onChange={(e) => {
                    setMinQty(e.target.value);
                  }}
                  variant="outlined"
                  type="number"
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Price"
                  margin="normal"
                  name="price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  value={price}
                  variant="outlined"
                  type="number"
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
                  Update Product
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

export default EditProduct;
