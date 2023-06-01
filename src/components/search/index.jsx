import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";

export const SearchInput = ({ setSearch }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 1,
        marginLeft: 2,
        marginTop: 10,
      }}
    >
      <input
        placeholder="Pizzas, tapiocas, hambúrgues..."
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "60%",
          minWidth: "320px",
          height: 40,
          borderRadius: 4,
          background: "#ce0303",
          boxShadow: "0 0 0 0",
          border: "0 none",
          outline: " 0",
          padding: 2,
        }}
      />
      <Box sx={{ display: "flex", position: "relative", right: 30 }}>
        <SearchIcon sx={{ color: "white" }} />
      </Box>
    </Box>
  );
};
