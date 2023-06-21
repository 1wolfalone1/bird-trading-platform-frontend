import {
   createSlice,
   createAsyncThunk,
   createSelector,
} from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { api } from "../../api/server/API";
import { toast } from "react-toastify";
import AddToCartToast, {
   toastType,
} from "../../component/toast/content/AddToCartToast";
export const userStatus = {
   GUEST: 0,
   USER: 1,
   SHOP_OWER: 2,
   SHOP_STAFF: 3,
   ADMIN: 4,
};

const cartSlice = createSlice({
   name: "productState",
   initialState: {
      items: [],
      vouchers: [],
      voucherSelected: { shipping: null, discount: null },
      total: 0,
      status: {
         msg: "",
         isValid: true,
      },
   },
   reducers: {
      addToCart: (state, action) => {
         let count = 0;
         console.log(current(state));

         state.items.map((item) => {
            if (item.id === action.payload.id) {
               count = count + 1;
               const newQuantity =
                  item.cartQuantity + action.payload.cartQuantity;
               console.log(newQuantity, item.quantity, "quantity");
               if (action.payload.quantity < newQuantity) {
                  toast(
                     <AddToCartToast
                        type={toastType.WARNING}
                        msg={"The quantity you need exceeds the product stock"}
                     />,
                     {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1500,
                     }
                  );
               } else {
                  toast(<AddToCartToast type={toastType.SUCCESS} />, {
                     position: toast.POSITION.TOP_RIGHT,
                     autoClose: 1500,
                  });

                  item.cartQuantity = newQuantity;
               }
               return item;
            } else {
               return item;
            }
         });

         if (count === 0) {
            toast(<AddToCartToast type={toastType.SUCCESS} />, {
               position: toast.POSITION.TOP_RIGHT,
               autoClose: 1500,
            });
            state.items.push(action.payload);
         }
      },
      removeItem: (state, action) => {
         state.items = state.items.filter(
            (item) => item.id !== action.payload.id
         );
         if (state.items.length === 0) {
            localStorage.removeItem("cart");
         }
      },
      removeCart: (state, action) => {
         state.items = [];
      },
      changeQuantity: (state, action) => {
         let updatedPayload = action.payload; // Create a new variable to hold the updated payload
         let count2 = 0;
         if (action.payload.isDetails) {
            updatedPayload = action.payload.cartObject; // Assign the updated payload to the new variable
            if (action.payload.quantityAdded === 0) {
               count2++;
               state.status = {
                  isValid: false,
                  msg: "You are attempting to add a quantity that not valid.",
               };
            }
         }

         let count = 0; // Change const to let since the count will be incremented

         if (
            updatedPayload.quantity >= +updatedPayload.cartQuantity &&
            +updatedPayload.cartQuantity > 0
         ) {
            state.items = state.items.map((item) => {
               if (item.id === updatedPayload.id) {
                  count++;
                  console.log(item);
                  item.cartQuantity = +updatedPayload.cartQuantity;
                  item.notValidMessage = "";
                  return item;
               } else {
                  return item;
               }
            });
            console.log(current(state));
            console.log(count);
            if (count === 0) {
               state.items.push(updatedPayload);
            }
            if (count2 === 0) {
               state.status = {
                  isValid: true,
               };
            }
         } else {
            state.status = {
               isValid: false,
               msg: "You are attempting to add a quantity that exceeds the current available stock.",
            };
         }
      },

      invokeCart: (state, action) => {
         return action.payload;
      },
      calculateTotal: (state, action) => {
         const total = state.items.reduce((total, item) => {
            return item.priceAfterDiscount * item.quantity;
         }, 0);
         state.total = total;
      },
      updateVoucher: (state, action) => {
         const updatedVouchers = action.payload;
         state.vouchers = updatedVouchers;
      },
      updateVoucherSelectedShipping: (state, action) => {
         state.voucherSelected.shipping = action.payload;
      },
      updateVoucherSelectedDiscount: (state, action) => {
         state.voucherSelected.discount = action.payload;
      },
      removeVoucher: (state, action) => {
         state.vouchers.map((voucher) => {
            if (voucher.id === action.payload.id) {
               return (voucher.checked = false);
            } else {
               return voucher;
            }
         });
      },
      changeStatus: (state, action) => {
         state.status = action.payload.status;
      },
      removeVoucher: (state, action) => {
         if (state.voucherSelected.shipping?.id === action.payload.id) {
            state.voucherSelected.shipping = null;
         }
         console.log("ship", action.payload);
         if (state.voucherSelected.discount?.id === action.payload.id) {
            state.voucherSelected.discount = null;
         }
      },
   },
   extraReducers: (builder) =>
      builder
         .addCase(invokeCart.fulfilled, (state, action) => {
            state.items = action.payload;
         })
         .addCase(invokeCart.rejected, (state, action) => {
            console.log(action.payload);
         }),
});

export default cartSlice;

export const invokeCart = createAsyncThunk("cart/invoke", async (carts) => {
   if (carts.items.length !== 0) {
      try {
         const id = carts.items.map((cart) => cart.id);
         const response = await api.get("products/id", {
            params: {
               id: id,
            },
         });
         const data = response.data;
         console.log(data);
         const newCarts = data.map((cart) => {
            const newCart = carts.items.find((item) => item.id === cart.id);
            if (newCart) {
               const notValidMessage =
                  newCart.cartQuantity > cart.quantity
                     ? "The desired quantity of the product is currently unavailable."
                     : "";
               return {
                  ...cart,
                  cartQuantity: +newCart.cartQuantity,
                  notValidMessage: notValidMessage,
               };
            }
         });
         return newCarts;
      } catch (e) {
         console.log(e);
      }
   } else {
      console.error("Cart error");
      return [];
   }
});

export const totalItemsSelector = (state) => state.cartSlice?.items?.length;

export const getCartSelector = (state) => state.cartSlice;

export const getListItemSelector = (state) => state.cartSlice.items;

export const getVouchersSelector = (state) => state.cartSlice.vouchers;

export const getCartStatusSelector = (state) => state.cartSlice.status;

export const getVoucherSelectedSelector = (state) =>
   state.cartSlice.voucherSelected;

export const totalPriceSelector = createSelector(
   getListItemSelector,
   getVouchersSelector,
   (items, vouchers) => {
      const total = items.reduce(
         (acc, item) => acc + item.discountedPrice * item.cartQuantity,
         0
      );
      const promotion = vouchers.reduce((acc, item) => {
         if (item.checked) {
            return acc + item.discount;
         } else {
            return acc;
         }
      }, 0);
      let totalPrice = total - promotion;
      if (totalPrice < 0) {
         totalPrice = 0;
      }
      return totalPrice;
   }
);

export const getItemQuantity = (id) =>
   createSelector(getListItemSelector, (items) => {
      const item = items?.find((item) => item.id === id);
      return item?.cartQuantity;
   });
