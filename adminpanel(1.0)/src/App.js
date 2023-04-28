import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Blogs from "./scenes/blogs";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import AccountDetails from "./scenes/AccountInfo";
import AddBlog from "./scenes/blogs/addBlog";
import EditBlog from "./scenes/blogs/editBlog";
import RolesList from "./scenes/Roles/RolesList";
import AddRole from "./scenes/Roles/AddRole";
import { SnackbarProvider } from "notistack";
import LoginPage from "./scenes/auth/LoginPage";
import AddUser from "./scenes/team/addUser";
import EditUser from "./scenes/team/editUser";
import AddBlogCategory from "./scenes/blogs/AddBlogCategory";
import BlogCateList from "./scenes/blogs/BlogCateList";
import TicketsList from "./scenes/tickets/TicketsList";
import CreateTicket from "./scenes/tickets/createTicket";
import ViewTicket from "./scenes/tickets/ViewTicket";
import EditFaq from "./scenes/faq/EditFaq";
import FAQList from "./scenes/faq/faqCategoryList";
import AddFaq from "./scenes/faq/AddFaq";
import AddFaqCate from "./scenes/faq/AddFaqCate";
import EditFaqCate from "./scenes/faq/EditFaqCate";
import ProductList from "./scenes/products/ProductList";
import AddProduct from "./scenes/products/AddProduct";
import ProdCateList from "./scenes/products/ProdCateLIst";
import ProdCateEdit from "./scenes/products/ProdCateEdit";
import AddProdCate from "./scenes/products/ProdCateAdd";
import EditProduct from "./scenes/products/ProductEdit";
import OrdersList from "./scenes/Orders/OrderList";
import RuleList from "./scenes/PricingRules/Rulelist";
import CouponList from "./scenes/coupons/CouponList";
import CouponAdd from "./scenes/coupons/CouponAdd";
import EditCoupon from "./scenes/coupons/CouponEdit";
import UserDetails from "./scenes/AccountInfo";
import TestimonialList from "./scenes/Testimonials/TestimonialList";
import TestimonialAdd from "./scenes/Testimonials/TestimonialAdd";
import TestimonialEdit from "./scenes/Testimonials/TestimonialEdit";
import PagesList from "./scenes/Pages/PagesList";
import AddPage from "./scenes/Pages/AddPage";
import EditPage from "./scenes/Pages/EditPage";
import AddRule from "./scenes/PricingRules/AddRule";
import EditRule from "./scenes/PricingRules/EditRule";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === "/" ;

  const isAuthenticated = sessionStorage.getItem("token");

  useEffect(() => {
    window.onpopstate = () => {
      if (!isAuthenticated && window.location.pathname !== "/") {
        alert("You must be logged in to access this page");
        window.history.pushState(null, "", "/");

      }
    
    };
  }, [isAuthenticated]);

  return (
    <SnackbarProvider maxSnack={3}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {!isLoginPage  && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
              {!isLoginPage  && <Topbar setIsSidebar={setIsSidebar} />}
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={isAuthenticated ? (<Dashboard />) : (<Navigate to="/" replace />)}/>
              
                {/* User Routes */}
                <Route path="/account" element={<UserDetails/>} />
                <Route path="/user/update/:id" element={<EditUser />} />
                <Route path="add-user" element={<AddUser />} />
                <Route path="/team" element={<Team />} />

                {/* FAQ Routes */}
                <Route path="/faqs/editfaq/:id" element={<EditFaq />} />
                <Route path="/faqs/faqlist" element={<FAQ />} />
                <Route path="/faqs/faqcategorieslist" element={<FAQList/>} />
                <Route path="/faqs/addfaq" element={<AddFaq/>} />
                <Route path="/faqs/addfaqcate" element={<AddFaqCate/>} />
                <Route path="/faqs/editfaqcate/:id" element={<EditFaqCate/>} />

                {/* Blogs Routes */}
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/addblogcategory" element={<AddBlogCategory />} />
                <Route path="/blogcategories" element={<BlogCateList/>}/>
                <Route path="/editblog/:id" element={<EditBlog />} />

                {/* Products Routes */}
                 <Route path="/products/productslist" element={<ProductList/>} /> 
                 <Route path="/products/addproduct" element={<AddProduct/>} /> 
                 <Route path="/products/editproduct/:id" element={<EditProduct/>} /> 
                 <Route path="/products/productscatelist" element={<ProdCateList/>} /> 
                 <Route path="/products/addproductscate" element={<AddProdCate/>} /> 
                 <Route path="/products/editproductscate/:id" element={<ProdCateEdit/>} /> 

                {/* Tickets Routes */}
                <Route path="/tickets/createticket" element={<CreateTicket />} />
                <Route path="/tickets/viewticket/:id" element={<ViewTicket />} />
                <Route path="/tickets/ticketslist" element={<TicketsList />} />

                {/* Orders Routes */}
                <Route path="/orders/allorders" element={<OrdersList/>} />

                {/* Pricing Rules Routes */}
                <Route path="/pricing/editrule/:id" element={<EditRule/>} />
                <Route path="/pricing/addrule" element={<AddRule/>} />
                <Route path="/pricing/allrules" element={<RuleList/>} />

                {/* Coupon Routes */}
                <Route path="/coupon/couponslist" element={<CouponList/>} />
                <Route path="/coupon/addcoupon" element={<CouponAdd/>} />
                <Route path="/coupon/editcoupon/:id" element={<EditCoupon/>} />
                
                {/* Roles Routes */}
                <Route path="/roles/allroles" element={<RolesList />} />
                <Route path="/roles/addrole" element={<AddRole />} />
                {/* Testimonial Routes */}
                <Route path="/testimonials/edittestimonial/:id" element={<TestimonialEdit />} />
                <Route path="/testimonials/addtestimonial" element={<TestimonialAdd />} />
                <Route path="/testimonials/testimonialslist" element={<TestimonialList/>} />

                {/* Pages Routes */}
                <Route path="/pages/pageslist" element={<PagesList />} />
                <Route path="/pages/addpage" element={<AddPage />} />
                <Route path="/pages/editpage/:id" element={<EditPage />} />


                
                {/* Not Found Route */}
                <Route path="*" element={<h1>404: Not Found</h1>} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SnackbarProvider>
  );
}

export default App;
