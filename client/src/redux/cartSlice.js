import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCart from "../api/cart.api";

// Async thunk lấy cart từ API
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await apiCart.getCarts();
  return response.data;
});

// Async thunk thêm cart
export const addToCart = createAsyncThunk("cart/addToCart", async (bookId) => {
  const response = await apiCart.addCart(bookId);
  return response.data;
});

// Async thunk xoá cart
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (bookId) => {
    await apiCart.deleteCart(bookId);
    return bookId; // trả về bookId để xóa khỏi state
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ bookId, quantity }) => {
    const response = await apiCart.updateCart(bookId, { quantity });
    return response.data; // trả về cart mới (hoặc bookId + quantity tùy backend)
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
    status: "idle",
    error: null,
  },
  reducers: {
    increaseQuantity(state, action) {
      const item = state.items.find((i) => i.bookId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((i) => i.bookId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    setCart(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.bookId !== action.payload
        );
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { bookId, quantity } = action.meta.arg;
        const item = state.items.find((i) => i.bookId === bookId);
        if (item) item.quantity = quantity;
      });
  },
});

export const { increaseQuantity, decreaseQuantity, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
