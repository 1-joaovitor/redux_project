import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Cart } from "../../cart";
import { loginUser, logout } from "../../../redux/store/userSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import img from "../../../img/huge.png";
export const Header = ({ title }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const recoveUser = localStorage.getItem("user1");
    if (recoveUser) {
      dispatch(loginUser(JSON.parse(recoveUser)));
    }
  }, []);
  const userLogin = useSelector((state) => state.user);
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(logout());
    localStorage.removeItem("user1");
    navigate("/");
    toast.success(`Ate a próxima ${userLogin.firstName}`);
  };
  const [anchorEl, setAnchorEl] = React.useState(false);
  const handleMenu = (event) => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#ffffff",
        }}
      >
        <Toolbar>
          {title === "Carrinho de compras" ? (
            <IconButton
              onClick={() => navigate("/home")}
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: "#ce0303" }}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : (
            ""
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={img}
              width={90}
              height={50}
              style={{ borderRadius: "10%" }}
            />
          </Typography>
          {userLogin?.Logged === true ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle sx={{ color: "#ce0303" }} />{" "}
                <Typography color="black"> {userLogin.firstName}</Typography>
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <Button onClick={Logout}>
                    Logout
                    <ExitToAppIcon />
                  </Button>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            ""
          )}
          <Cart cart={() => navigate("/detalhes")} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
