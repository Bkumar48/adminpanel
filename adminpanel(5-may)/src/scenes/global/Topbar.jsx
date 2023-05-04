import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useRef } from "react";
import user from './img/user.png';
import logout from './img/log-out.png';
import "./AccontInfo.css"
import axios from "axios";
import { useSnackbar } from "notistack";
import jwt from 'jwt-decode'

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { enqueueSnackbar } = useSnackbar();


  // Acount Get information
  const [accountInfo, setAccountInfo] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const decoded = jwt(token);
    const userId = decoded.user_id;
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/getUser/?userId=${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAccountInfo(res.data.data);
      })
      .catch((err) => {
        enqueueSnackbar("Error Occured", { variant: "error" });
      });
  }, []);
  // Account Info Page
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });



  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton  ref={menuRef}>
          <PersonOutlinedIcon  onClick={()=>{setOpen(!open)}} />
          
            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
            <h3>{accountInfo.firstName}<br/><span>{accountInfo.email}</span></h3>
            <ul>
              <DropdownItem img = {user} text = {"My Profile"}/>
              {/* <DropdownItem img = {edit} text = {"Edit Profile"}/> */}
              {/* <DropdownItem img = {inbox} text = {"Inbox"}/> */}
              {/* <DropdownItem img = {settings} text = {"Settings"}/> */}
              {/* <DropdownItem img = {help} text = {"Helps"}/> */}
              <div onClick={()=>{
                sessionStorage.removeItem("token");
                window.location.href = "/";
              }}><DropdownItem img = {logout} text = {"Logout"}/></div>
            </ul>
          </div>
          
        </IconButton>
      </Box>
    </Box>
  );
};

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}


export default Topbar;
