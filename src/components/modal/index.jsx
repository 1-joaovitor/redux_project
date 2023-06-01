import { Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

export const Modal = ({ open, setOpen, itemList }) => {
  return (
    <Fragment>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Card>
          <CardMedia sx={{ height: 201 }} image={itemList?.img || ""} />
          <CardContent sx={{ pt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {itemList?.subtitle}

              <Typography variant="h4" sx={{ mb: 2 }}>
                R$ {itemList?.price}
              </Typography>
            </Typography>
            <Typography variant="body2">{itemList?.content}</Typography>
            <Rating name="read-only" />
          </CardContent>
        </Card>
        <DialogActions
          className="dialog-actions-dense"
          sx={{ justifyContent: "space-between" }}
        >
          <Button onClick={() => setOpen(false)}>Voltar</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
