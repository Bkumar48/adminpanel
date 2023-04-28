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
import { Box, Button, TextField, MenuItem, Divider } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const AddProduct = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [bannertitle, setBannerTitle] = useState("");
  const [title, setTitle] = useState("");
  // const [stripColor, setStripColor] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [producttag, setProductTag] = useState("");
  const [image, setImage] = useState("");
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

  const handleSubmit = async(values) => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/productAdd`,
        {
          banner_title: values.bannertitle,
          title: values.title,
          strip_color: values.stripColor,
          parent_cate_id: values.parentCategory,
          // hasSubCategory: values.hasSubCategory,
          // sub_cate_id: "63e4ea345e233ed8a321e967", 
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
        setError(err);
        console.log(values)
        setLoading(false);
        enqueueSnackbar(error, { variant: "error" });
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
        // console.log(res.data.data);
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
                // hasSubCategory: false,
                subCategory: "",
                producttag: "",
                image: "",
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
                // hasSubCategory: Yup.string().max(255).required("Has Sub Category is required"),
                // subCategory: Yup.string().max(255).required("Sub Category is required"),
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
                <form onSubmit={handleSubmit}>
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
                    {/* {console.log(values.stripColor)} */}
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

                  {/* {console.log(parentCategory)} */}
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
                      onBlur={handleBlur}
                      // onChange={(e) => {handleChange(URL.createObjectURL(e.target.files[0]))}}
                      // onChange={handleChange}
                      onChange={(e)=>{setFieldValue("image", e.currentTarget.files[0])}}
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
                      // disabled={isSubmitting}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Add Product
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
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AddProduct;



























// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useTheme } from "@mui/material/styles";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { SnackbarProvider, useSnackbar } from "notistack";
// import { useLocation } from "react-router-dom";
// import { Box, Button, TextField, MenuItem, Divider } from "@mui/material";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../components/Header";

// const AddProduct = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const navigate = useNavigate();
//   //   const dispatch = useDispatch();
//   const { enqueueSnackbar } = useSnackbar();
//   const location = useLocation();
//   const [bannertitle, setBannerTitle] = useState("");
//   const [title, setTitle] = useState("");
//   const [stripColor, setStripColor] = useState("#000000");
//   const [parentCategory, setParentCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [producttag, setProductTag] = useState("");
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState("");
//   const [stock, setStock] = useState("");
//   const [minQty, setMinQty] = useState("");
//   const [price, setPrice] = useState("");
//   const [slug, setSlug] = useState("");
//   const [keyword, setKeyword] = useState("");
//   const [canonical, setCanonical] = useState("");
//   const [metaTitle, setMetaTitle] = useState("");
//   const [metaDescription, setMetaDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [parentCategories, setParentCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const handleSubmit = async () => {
//     // e.preventDefault();
//     setLoading(true);
//     await axios
//       .post(
//         `${process.env.REACT_APP_BASE_URL}/api/v1/product/productAdd`,
//         {
//           banner_title: bannertitle,
//           title: title,
//           strip_color: stripColor,
//           parent_cate_id: parentCategory,
//           // hasSubCategory: values.hasSubCategory,
//           // sub_cate_id: subCategory,
//           product_tag: producttag,
//           // image: image,
//           description: description,
//           stock: stock,
//           min_qty: minQty,
//           price: price,
//           slug: slug,
//           keyword: keyword,
//           canonical_links: canonical,
//           meta_title: metaTitle,
//           meta_description: metaDescription,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//           },
//         }
//       )

//       .then((res) => {
//         setSuccess(res.data);
//         console.log(res.image);
//         setLoading(false);
//         enqueueSnackbar("Product added successfully", { variant: "success" });
//         setTimeout(() => {
//           navigate("/products/productslist");
//         }, 500);
//       })
//       .catch((err) => {
//         setError(err.response.data);
//         setLoading(false);
//         enqueueSnackbar(err.response.message, { variant: "error" });
//       });
//   };

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}/api/v1/product/productCateList`, {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => {
//         setParentCategories(res.data.data);
//         // console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div>
//       <Header />
//       <Box
//         sx={{
//           backgroundColor: colors.background,
//           minHeight: "100%",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "start",
//             ml: "8%",
//           }}
//         >
//           <Box
//             sx={{
//               backgroundColor: colors.white,
//               borderRadius: 1,
//               boxShadow: 5,
//               p: 3,
//               width: isMobile ? "100%" : "60%",
//             }}
//           >
//             <form >
//               <Header title="Product" subtitle="Add a new products here" />
//               <Divider />
//               <Box sx={{ mt: 3 }}>
//                 <TextField
//                   fullWidth
//                   label="Banner Title"
//                   margin="normal"
//                   name="bannertitle"
//                   onChange={(e) => {
//                     setBannerTitle(e.target.value);
//                   }}
//                   value={bannertitle}
//                   variant="outlined"
//                 />
//               </Box>

//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Title"
//                   margin="normal"
//                   name="title"
//                   onChange={(e) => {
//                     setTitle(e.target.value);
//                   }}
//                   value={title}
//                   variant="outlined"
//                 />
//               </Box>

//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Strip Color"
//                   margin="normal"
//                   name="stripColor"
//                   onChange={(e) => {
//                     setStripColor(e.target.value);
//                   }}
//                   value={stripColor}
//                   variant="outlined"
//                   type="color"
//                 />
//                 {console.log(stripColor)}
//               </Box>

//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Parent Category"
//                   margin="normal"
//                   name="parentCategory"
//                   onChange={(e) => {
//                     setParentCategory(e.target.value);
//                   }}
//                   value={parentCategory}
//                   variant="outlined"
//                   select
//                 >
//                   {parentCategories
//                     .filter((option) => option.parent_id == 0)
//                     .map((option) => (
//                       <MenuItem key={option._id} value={option._id}>
//                         {option.name}
//                       </MenuItem>
//                     ))}
//                 </TextField>
//               </Box>

//               {/* {console.log(parentCategory)} */}
//               {/* {parentCategory && (
//                     <Box>
//                       <TextField
//                         error={Boolean(
//                           touched.subCategory && errors.subCategory
//                         )}
//                         fullWidth
//                         helperText={touched.subCategory && errors.subCategory}
//                         label="Sub Category"
//                         margin="normal"
//                         name="subCategory"
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         value={values.subCategory}
//                         variant="outlined"
//                         select
//                       >
//                         {parentCategories
//                           .filter(
//                             (option) => option.parent_id == parentCategory._id
//                           )
//                           .map((option) => (
//                             <MenuItem key={option._id} value={option._id}>
//                               {option.name}
//                             </MenuItem>
//                           ))}
//                       </TextField>
//                     </Box>
//                   )} */}

//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Product Tag"
//                   margin="normal"
//                   name="producttag"
//                   onChange={(e) => {
//                     setProductTag(e.target.value);
//                   }}
//                   value={producttag}
//                   variant="outlined"
//                   select
//                 >
//                   <MenuItem value="fresh">Fresh</MenuItem>
//                   <MenuItem value="pva">PVA</MenuItem>
//                   <MenuItem value="aged">Aged</MenuItem>
//                 </TextField>
//               </Box>

//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Image"
//                   margin="normal"
//                   name="image"
//                   onChange={(e) => {
//                     setImage(URL.createObjectURL(e.target.files[0]));
//                     console.log("Image", e.target.files[0]);
//                   }}
//                   value={image.name}
//                   variant="outlined"
//                   type="file"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </Box>

//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Description"
//                   margin="normal"
//                   name="description"
//                   onChange={(e) => {
//                     setDescription(e.target.value);
//                   }}
//                   value={description}
//                   variant="outlined"
//                   multiline
//                   rows={4}
//                 />
//               </Box>

//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Stock"
//                   margin="normal"
//                   name="stock"
//                   onChange={(e) => {
//                     setStock(e.target.value);
//                   }}
//                   value={stock}
//                   variant="outlined"
//                   type="number"
//                 />
//               </Box>
//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Min Qty"
//                   margin="normal"
//                   name="minQty"
//                   value={minQty}
//                   onChange={(e) => {
//                     setMinQty(e.target.value);
//                   }}
//                   variant="outlined"
//                   type="number"
//                 />
//               </Box>
//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Price"
//                   margin="normal"
//                   name="price"
//                   onChange={(e) => {
//                     setPrice(e.target.value);
//                   }}
//                   value={price}
//                   variant="outlined"
//                   type="number"
//                 />
//               </Box>

//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Slug"
//                   margin="normal"
//                   name="slug"
//                   onChange={(e) => {
//                     setSlug(e.target.value);
//                   }}
//                   value={slug}
//                 />
//               </Box>

//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Keyword"
//                   margin="normal"
//                   name="keyword"
//                   onChange={(e) => {
//                     setKeyword(e.target.value);
//                   }}
//                   value={keyword}
//                   variant="outlined"
//                 />
//               </Box>

//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Canonical Links"
//                   margin="normal"
//                   name="canonical"
//                   onChange={(e) => {
//                     setCanonical(e.target.value);
//                   }}
//                   value={canonical}
//                   variant="outlined"
//                 />
//               </Box>

//               <Box>
//                 <TextField
//                   fullWidth
//                   label="Meta Title"
//                   margin="normal"
//                   name="metaTitle"
//                   onChange={(e) => {
//                     setMetaTitle(e.target.value);
//                   }}
//                   value={metaTitle}
//                   variant="outlined"
//                 />
//               </Box>

//               <Box sx={{ mb: 3 }}>
//                 <TextField
//                   fullWidth
//                   label="Meta Description"
//                   margin="normal"
//                   name="metaDescription"
//                   onChange={(e) => {
//                     setMetaDescription(e.target.value);
//                   }}
//                   value={metaDescription}
//                   variant="outlined"
//                 />
//               </Box>

//               <Divider />

//               <Box
//                 display={{ xs: "block", sm: "flex" }}
//                 justifyContent="space-between"
//                 sx={{ py: 2, mt: 3 }}
//               >
//                 <Button
//                   color="primary"
//                   size="large"
//                   type="submit"
//                   variant="contained"
//                   onClick={handleSubmit}
//                 >
//                   Add Product
//                 </Button>
//                 <Link to="/blogs">
//                   <Button
//                     color="error"
//                     size="large"
//                     type="submit"
//                     variant="contained"
//                   >
//                     Cancel
//                   </Button>
//                 </Link>
//               </Box>
//             </form>
//           </Box>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default AddProduct;
