import * as React from "react";
import { ItemList } from "../../components/features/ItemList";
import { Header } from "../../components/features/header";
import { Grid } from "@mui/material";

export const HomePage = () => {
  return (
    <Grid>
      <Header title={" Monstrous Hunger"} />
      <ItemList />
    </Grid>
  );
};
