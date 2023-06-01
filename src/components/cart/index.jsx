import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { recoverCartStorage } from "../../redux/store/cartSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const Cart = ({ cart }) => {
  const dispatch = useDispatch();
  const ItemCart = useSelector((state) => state.addCart.products);
  React.useEffect(() => {
    const recoverCart = localStorage.getItem("cart");

    if (recoverCart) {
      dispatch(recoverCartStorage(JSON.parse(recoverCart)));
    }
  }, []);

  return (
    <IconButton aria-label="cart" onClick={cart}>
      <StyledBadge badgeContent={ItemCart?.length} color="warning">
        <ShoppingCartIcon sx={{ color: "#ce0303" }} />
      </StyledBadge>
    </IconButton>
  );
};
