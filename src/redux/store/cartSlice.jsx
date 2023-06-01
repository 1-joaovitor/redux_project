import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addCart(state, { payload }) {
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.products, payload])
      );
      return { products: [...state.products, payload] };
    },
    recoverCartStorage(state, { payload }) {
      return { products: payload };
    },

    removeItemCart(state, { payload }) {
      {
        state.products = state.products.filter(
          (products) => products.id !== payload
        );
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    addQuantity(state, { payload }) {
      state.products.map((product) => {
        const array =
          product.id === payload.item.id
            ? { ...product, amount: (product.amount = Number(payload.value)) }
            : product;

        localStorage.setItem("cart", JSON.stringify(state.products, array));
      });
    },
  },
});

export const { addCart, removeItemCart, recoverCartStorage, addQuantity } =
  slice.actions;
export default slice.reducer;
