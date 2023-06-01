import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/store/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ImgLogin, Form } from "./styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { userValidation } from "../../constant/user";
import img from "../../img/huge.png";
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const route = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "João vitor",
      email: "sjoaovitor272@gmail.com",
      password: "123456",
    },
  });
  const onSubmit = (data) => {
    const { email, password } = data;

    const userIndex = userValidation.findIndex(
      (user) => user?.email === email && user.password === password
    );

    if (userIndex !== -1) {
      localStorage.setItem("user1", JSON.stringify(data));
      dispatch(loginUser(data));
      toast.success(`Seja bem vindo ${data?.firstName}`);
      reset();
      route("/home");
    } else {
      toast.error(`Este usuário não estar no nosso  banco de dados`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "inherit",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 14,
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            minWidth: 300,
          }}
        >
          <ImgLogin src={img} width={150} height={120} />
        </Box>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "grid", gap: 2, padding: 1 }}>
            {errors.firstName?.type === "required" && (
              <Typography variant="h8" role="alert" color="red">
                Digite seu nome
              </Typography>
            )}
            <TextField
              sx={{ backgroundColor: "#f8faf75e", input: { color: "black" } }}
              variant="filled"
              fullWidth
              label="Nome"
              color="error"
              type="text"
              {...register("firstName", { required: true })}
            />

            <TextField
              sx={{ backgroundColor: "#f8faf75e", input: { color: "black" } }}
              variant="filled"
              fullWidth
              label="Email"
              color="error"
              type="email"
              {...register("email")}
            />
            {errors.password?.type === "required" && (
              <Typography variant="h8" role="alert" color="red">
                Digite uma senha
              </Typography>
            )}
            <FormControl sx={{ width: "100%" }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                sx={{ backgroundColor: "#f8faf75e", color: "black" }}
                {...register("password")}
                color="error"
                fullWidth
                variant="filled"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#ce0303",
                "&:hover": {
                  backgroundColor: "#972705",
                },
              }}
            >
              Entrar
            </Button>
          </Box>
        </Form>
      </Container>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          zIndex: -1,
          bottom: 0,
          right: 0,
        }}
      >
        <ImgLogin
          src="https://meucheflanches.com.br/wp-content/uploads/2021/11/arteburger-1.png"
          width={600}
          height={400}
        />
      </Box>
      <Toaster />
    </Box>
  );
};
