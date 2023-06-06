import {
   createSlice,
   createAsyncThunk,
   createSelector,
} from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
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
      vouchers: [
         {
            id: 1,
            code: "SUMMER10",
            discount: 10,
            description: "Get 10% off on your purchase.",
            expirationDate: "5/6/2023",
         },
         {
            id: 2,
            code: "FREESHIP",
            discount: 100,
            description: "Free shipping on all orders.",
            expirationDate: "5/6/2023",
         },
         {
            id: 3,
            code: "SALE25",
            discount: 25,
            description: "Save 25% on selected items.",
            expirationDate: "5/6/2023",
         },
         {
            id: 4,
            code: "SALE50",
            discount: 50,
            description: "Save 50% on selected items.",
            expirationDate: "5/6/2023",
         },
         {
            id: 5,
            code: "SALE70",
            discount: 70,
            description: "Save 70% on selected items.",
            expirationDate: "5/6/2023",
         },
         {
            id: 6,
            code: "SALE70",
            discount: 70,
            description: "Save 70% on selected items.",
            expirationDate: "5/6/2023",
         },
         {
            id: 7,
            code: "SALE70",
            discount: 70,
            description: "Save 70% on selected items.",
            expirationDate: "5/6/2023",
         },
         {
            id: 8,
            code: "SALE70",
            discount: 70,
            description: "Save 70% on selected items.",
            expirationDate: "5/6/2023",
         },
         {
            id: 9,
            code: "SALE70",
            discount: 70,
            description: "Save 70% on selected items.",
            expirationDate: "5/6/2023",
         },
         {
            id: 10,
            code: "SALE70",
            discount: 70,
            description: "Save 70% on selected items.",
            expirationDate: "5/6/2023",
         },
      ],
      total: 0,
      status: {
         msg: '',
         isValid: true
      }
   },
   reducers: {
      addToCart: (state, action) => {
         let count = 0;
         state.items.map((item) => {
            if (item.id === action.payload.id) {
               count = count + 1;
               item.cartQuantity = item.cartQuantity + action.payload.cartQuantity;
               return item;
            } else {
               return item;
            }
         });
         if (count === 0) state.items.push(action.payload);
      },
      removeItem: (state, action) => {
         state.items = state.items.filter(
            (item) => item.id !== action.payload.id
         );
         if (state.items.length === 0) {
            localStorage.removeItem("cart");
         }
      },
      changeQuantity: (state, action) => {
         if (
            action.payload.quantity >= action.payload.cartQuantity &&
            action.payload.cartQuantity >= 0
         ) {
            state.items.map((item) => {
               if (item.id === action.payload.id) {
                  return (item.cartQuantity = action.payload.cartQuantity);
               } else {
                  return item;
               }
            });
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
         state.vouchers = action.payload;
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
      // removeVoucher: (state, action) => {
      //    const voucherIndex = state.vouchers.findIndex((voucher) => voucher.id === action.payload);

      //    if (voucherIndex !== -1) {
      //      state.vouchers[voucherIndex].checked = false;
      //    }
      //  },
   },
});

export default cartSlice;

export const totalItemsSelector = (state) => state.cartSlice?.items.length;

export const getCartSelector = (state) => state.cartSlice;

export const getListItemSelector = (state) => state.cartSlice.items;

export const getVouchersSelector = (state) => state.cartSlice.vouchers;

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
      if(totalPrice < 0){
         totalPrice = 0;
      }
      return totalPrice;
   }
);
