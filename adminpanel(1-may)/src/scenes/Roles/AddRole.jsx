import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Divider,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";

const AddRole = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //  Role states
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");

  // Permission states
  const [roleId, setRoleId] = useState("");
  const [permissions, setPermissions] = useState({
    users: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    role: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    permission: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    page: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    blogs: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    blogs_cate: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    product: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    product_cate: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    coupon: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    ticket: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    faq: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    faq_cate: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    orders: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    testimonial: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    priceRules: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
  });

  const handleRoleName = (e) => {
    setRoleName(e.target.value);
  }

  const handleRoleDescription = (e) => {
    setRoleDescription(e.target.value);
  }

  const handlePermission = (e) => {
    const { name, value } = e.target;
    setPermissions({
      ...permissions,
      [name]: {
        ...permissions[name],
        [value]: !permissions[name][value],
      },
    });
  }

  // function to add role
  const handleSubmit = async (e) => {
    const data = {
      name: roleName,
      description: roleDescription,
    };
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/create`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setSuccess(res.data.message);
        setLoading(false);
        navigate("/roles/allroles");
      }
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  // function to add role permissions
const checkPermission = (e) => {
    const { name, value } = e.target;
    setPermissions({
      ...permissions,
      [name]: {
        ...permissions[name],
        [value]: !permissions[name][value],
      },
    });
  }
  

  const handleAddRolePermission = async (e) => {
    const data = {
      roleId: roleId,
      users: {
        create: permissions.users.create,
        read: permissions.users.read,
        update: permissions.users.update,
        delete: permissions.users.delete,
      },
      role: {
        create: permissions.role.create,
        read: permissions.role.read,
        update: permissions.role.update,
        delete: permissions.role.delete,
      },
      permission: {
        create: permissions.permission.create,
        read: permissions.permission.read,
        update: permissions.permission.update,
        delete: permissions.permission.delete,
      },

      page: {
        create: permissions.page.create,
        read: permissions.page.read,
        update: permissions.page.update,
        delete: permissions.page.delete,
      },
      blogs: {
        create: permissions.blogs.create,
        read: permissions.blogs.read,
        update: permissions.blogs.update,
        delete: permissions.blogs.delete,
      },
      blogs_cate: {
        create: permissions.blogs_cate.create,
        read: permissions.blogs_cate.read,
        update: permissions.blogs_cate.update,
        delete: permissions.blogs_cate.delete,
      },
      product: {
        create: permissions.product.create,
        read: permissions.product.read,
        update: permissions.product.update,
        delete: permissions.product.delete,
      },
      product_cate: {
        create: permissions.product_cate.create,
        read: permissions.product_cate.read,
        update: permissions.product_cate.update,
        delete: permissions.product_cate.delete,
      },
      coupon: {
        create: permissions.coupon.create,
        read: permissions.coupon.read,
        update: permissions.coupon.update,
        delete: permissions.coupon.delete,
      },
      ticket: {
        create: permissions.ticket.create,
        read: permissions.ticket.read,
        update: permissions.ticket.update,
        delete: permissions.ticket.delete,
      },
      faq: {
        create: permissions.faq.create,
        read: permissions.faq.read,
        update: permissions.faq.update,
        delete: permissions.faq.delete,
      },
      faq_cate: {
        create: permissions.faq_cate.create,
        read: permissions.faq_cate.read,

        update: permissions.faq_cate.update,
        delete: permissions.faq_cate.delete,
      },
      orders: {
        create: permissions.orders.create,
        read: permissions.orders.read,
        update: permissions.orders.update,
        delete: permissions.orders.delete,
      },
      testimonial: {
        create: permissions.testimonial.create,
        read: permissions.testimonial.read,
        update: permissions.testimonial.update,
        delete: permissions.testimonial.delete,
      },
      priceRules: {
        create: permissions.priceRules.create,
        read: permissions.priceRules.read,
        update: permissions.priceRules.update,
        delete: permissions.priceRules.delete,
      }
    };
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users/roles/addPermission`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setSuccess(res.data.message);
        setLoading(false);
        navigate("/roles/allroles");
      }
    }
    catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };




