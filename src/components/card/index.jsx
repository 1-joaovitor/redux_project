import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Box} from "@mui/material";
import Rating from "@mui/material/Rating";

export default function MediaCard(props) {
  const { content, title, img, actions, price, item } = props;
  return (
    <Card
      sx={{
        width: 250,
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", position: "relative" }}>
        <img src={img} width={100} height={100} />
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          top: 40,
          width: "100%",
        }}
      >
        <Typography
          fontFamily={"fantasy"}
          fontWeight={"500"}
          variant="h6"
          fontSize={14}
          sx={{ maxWidth: 250 }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            justifyContent: "center",
            backgroundColor: "#aecfda83",
            borderRadius: 2,
            maxWidth: 150,
          }}
        >
          <Typography
            fontSize={17}
            variant="body2"
            fontFamily={"fantasy"}
            fontWeight={"500"}
            color={"#0fc21e"}
          >
            R${price}, 00
          </Typography>
          <Rating name="half-rating" value={item?.assessment} readOnly />
        </Box>

        <Typography variant="body2">{content}</Typography>
      </CardContent>

      {actions}
    </Card>
  );
}
