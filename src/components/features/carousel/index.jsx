import { Box, Button, Grid, Typography } from "@mui/material";

export const Carousel = ({ filterCategory, arrayDates, setFilterArray }) => {
  const filterItemCategory = (itemData) => {
    const category = arrayDates.filter((item) => item?.title === itemData);
    setFilterArray(category);
  };
  return (
    <Box>
      <Grid
        sx={{ display: "grid", padding: 2, columnGap: 2, rowGap: 1 }}
        justifyContent="center"
        alignItems="center"
        gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))"
      >
        <Button
          fullWidth
          sx={{
            color: "white",

            backgroundColor: "#ce0303",
            "&:hover": {
              backgroundColor: "#a00909b3",
            },
          }}
          variant="contained"
          className="item"
          onClick={() => setFilterArray(arrayDates)}
        >
          <Typography variant="h9">Todos</Typography>
        </Button>
        {filterCategory.map((item) => (
          <Box key={item}>
            <Button
              fullWidth
              sx={{
                color: "white",
                backgroundColor: "#ce0303",
                "&:hover": {
                  backgroundColor: "#a00909b3",
                },
              }}
              variant="contained"
              className="item"
              onClick={() => filterItemCategory(item)}
            >
              <Typography variant="h9">{item}</Typography>
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
