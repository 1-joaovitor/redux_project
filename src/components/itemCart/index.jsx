import { Button, Grid, Rating, Box, Typography, List } from "@mui/material";
import Alert from "@mui/material/Alert";
import MuiLink from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AlertTitle from "@mui/material/AlertTitle";
import CardContent from "@mui/material/CardContent";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Header } from "../features/header";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  recoverCartStorage,
  removeItemCart,
  addQuantity,
} from "../../redux/store/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const ItemCart = () => {
  const ItemCart = useSelector((state) => state?.addCart?.products);

  const dispatch = useDispatch();

  const [discountValue, setDiscountValue] = useState("");
  const [messageDiscount, setMessageDiscount] = useState("");
  const [sum, setSum] = useState("");

  useEffect(() => {
    const recoverCart = localStorage.getItem("cart");

    if (recoverCart) {
      dispatch(recoverCartStorage(JSON.parse(recoverCart)));
    }
  }, []);
  useEffect(() => {
    SumCart();
  }, [ItemCart]);

  const removeItem = (id) => {
    dispatch(removeItemCart(id));
    toast.success("Item removido");
  };
  const discount = () => {
    if (discountValue === "desconto") {
      toast.success("cupom inserido");
      setMessageDiscount(
        "Parabéns você acabou de receber 10% de desconto na sua compra"
      );
      var des = (10 * sum) / 100;
      setSum(sum - des);
    } else {
      toast.error("cupom inválido");
      setMessageDiscount("Infezlimente esse cupom encontra-se expirado");
    }
  };

  const SumCart = () => {
    const sum = ItemCart?.reduce(
      (acc, curr) => acc + curr.price * curr.amount,
      0
    );
    setSum(sum);
  };

  const quantity = (item, value) => {
    if (value == 0) {
      dispatch(removeItemCart(item.id));
    }
    dispatch(addQuantity({ item, value }));
  };
  return (
    <>
      <Header title={"Carrinho de compras"} />
      <Grid
        container
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          marginTop: 10,
          padding: 1,
        }}
      >
        <Grid item xs={12} lg={8}>
          <Alert
            severity="success"
            icon={""}
            sx={{ mb: 4, margin: 2, marginLeft: 2, borderRadius: 5 }}
          >
            <AlertTitle>Descontos ativos</AlertTitle>
            <Box>
              <Typography sx={{ color: "success.main" }}>
                - 10% Na compra de um combo artesanal
              </Typography>
              <Typography sx={{ color: "success.main" }}>
                - 25% Na compra de quatro pastéis
              </Typography>
            </Box>
          </Alert>
          {ItemCart?.length === 0 ? (
            <Typography variant="h6" color="black" sx={{ mb: 4 }}>
              Lista de itens vazia...
            </Typography>
          ) : (
            <Typography variant="h6" color="white" sx={{ mb: 4 }}>
              Lista de itens
            </Typography>
          )}
          <List sx={{ mb: 4 }}>
            {ItemCart?.map((item) => (
              <ListItem key={item?.id} sx={{ borderTop: "solid 1px black" }}>
                <ListItemAvatar>
                  <img width={140} src={item?.img} alt="Google Home" />
                </ListItemAvatar>

                <Grid container>
                  <Grid item xs={12} md={8}>
                    <ListItemText primary={item?.subtitle} />
                    <Rating
                      name="google-nest-rating"
                      value={item?.assessment}
                      readOnly
                    />
                    <Box sx={{ display: "flex" }}>
                      <IconButton
                        size="small"
                        className="remove-item"
                        sx={{ color: "text.primary" }}
                        onClick={() => removeItem(item?.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <TextField
                        onClick={(value) => quantity(item, value.target.value)}
                        defaultValue={item?.amount}
                        size="small"
                        type="number"
                        sx={{ maxWidth: 70, display: "block" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ mt: [6, 6, 8] }}>
                    <Box
                      sx={{
                        gap: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: " end",
                      }}
                    >
                      <Grid sx={{ position: "absolute", bottom: 5 }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "black", fontWeight: "700" }}
                        >
                          R${item?.price * item?.amount}
                        </Typography>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              mb: 4,
              borderRadius: 1,
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent>
              <Typography sx={{ mb: 4, fontWeight: 600 }}>Offer</Typography>
              <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                <TextField
                  fullWidth
                  sx={{ mr: 4 }}
                  size="small"
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder="Insira o código do cumpom"
                />
                <Button variant="outlined" onClick={discount}>
                  Aplicar
                </Button>
              </Box>
              <Box
                sx={{ p: 4, borderRadius: 1, backgroundColor: "action.hover" }}
              >
                <Typography sx={{ mb: 2, fontWeight: 600 }}>
                  {messageDiscount}
                </Typography>
              </Box>
            </CardContent>
            <Divider sx={{ my: "0 !important" }} />
            <CardContent>
              <Typography sx={{ mb: 4, fontWeight: 600 }}>
                Detalhes dos valores
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    mb: 2,
                    gap: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    Total
                  </Typography>
                  <Typography variant="body2">{"111"}</Typography>
                </Box>
                <Box
                  sx={{
                    mb: 2,
                    gap: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    Cupom de desconto
                  </Typography>
                  <Typography
                    href="/"
                    variant="body2"
                    component={MuiLink}
                    onClick={(e) => e.preventDefault()}
                    sx={{
                      display: "block",
                      fontWeight: 600,
                      color: "primary.main",
                    }}
                  >
                    Apply Coupon
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mb: 2,
                    gap: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    Total dos pedidos
                  </Typography>
                  <Typography variant="body2">R$</Typography>
                </Box>
                <Box
                  sx={{
                    gap: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    Taxa de entrega
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        mr: 2,
                      }}
                    >
                      10% do valor total: R$
                    </Typography>
                    <LocalShippingIcon />
                  </Box>
                </Box>
              </Box>
            </CardContent>
            <Divider sx={{ my: "0 !important" }} />
            <CardContent
              sx={{ py: (theme) => `${theme.spacing(3.5)} !important` }}
            >
              <Box
                sx={{
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>Total</Typography>
                <Typography sx={{ fontWeight: 600 }}>R${sum}</Typography>
              </Box>
            </CardContent>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button fullWidth variant="contained" onClick={() => alert("OI")}>
              Place Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
