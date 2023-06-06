import React, { useEffect, useState } from "react";
import clsx from "clsx";
import s from "./cartContainer.module.scss";
import { Button, Chip, IconButton, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import Popup from "reactjs-popup";
import Voucher from "../../component/order/Voucher";
import Style from "../../style/inline-style/style";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, {
   getCartSelector,
   getListItemSelector,
   getVouchersSelector,
   totalPriceSelector,
} from "./cartSlice";
import DiscountIcon from "@mui/icons-material/Discount";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const birdProducts = [
   {
      id: 1,
      name: "Blue Jay",
      shop: "Shop 1",
      image: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/302355171/1800",
      price: 10,
      quantity: 1,
      stock: 5,
   },
   {
      id: 2,
      name: "Cardinal",
      shop: "Shop 2",
      image: "https://www.thespruce.com/thmb/MAIPOntEWbxzkwi-MQLeSKL_74c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/northern-cardinal-profile-387268-02-aa299072737b4de78180a11dfc110bc9.jpg",
      price: 12,
      quantity: 2,
      stock: 10,
   },
   {
      id: 3,
      name: "Hummingbird",
      shop: "Shop 3",
      image: "https://www.birdnote.org/sites/default/files/annas-hummingbird-thriving-Becky-Matsubara-cc-crp.jpg",
      price: 8,
      quantity: 3,
      stock: 3,
   },
];

export default function Cart() {
   const vouchers = useSelector(getVouchersSelector);
   const dispatch = useDispatch();
   const total = useSelector(totalPriceSelector);
   const carts = useSelector(getListItemSelector);
   console.log(carts, "--------------------------------------");

   const handleChangeQuantity = (item) => {
      return (e) => {
         dispatch(
            cartSlice.actions.changeQuantity({
               ...item,
               cartQuantity: e.target.value,
            })
         );
      };
   };

   const handleVoucherItemDelete = (item) => {
      return () => {
         dispatch(cartSlice.actions.removeVoucher(item));
      };
   };
   return (
      <>
         {carts.length > 0 ? (
            <div>
               <p>Your cart have {carts.length} items</p>
               <Grid className={clsx(s.birdList)}>
                  <Grid className={clsx(s.header)}>
                     <Grid container columns={9}>
                        <Grid sm={3} md={3} xl={3} className={clsx(s.item)}>
                           Item
                        </Grid>
                        <Grid
                           sm={1}
                           md={1}
                           xl={1}
                           className={clsx(s.stockItem)}
                        >
                           In Stock
                        </Grid>
                        <Grid
                           sm={1}
                           md={1}
                           xl={1}
                           className={clsx(s.priceItem)}
                        >
                           Price
                        </Grid>
                        <Grid
                           sm={2}
                           md={2}
                           xl={2}
                           className={clsx(s.quantityItem)}
                        >
                           Quantity
                        </Grid>
                        <Grid
                           sm={1}
                           md={1}
                           xl={1}
                           className={clsx(s.totalPrice)}
                        >
                           Total
                        </Grid>
                        <Grid sm={1} md={1} xl={1} className={clsx(s.remove)}>
                           Remove
                        </Grid>
                     </Grid>
                  </Grid>

                  <Grid className={clsx(s.bird)}>
                     {carts.map((item) => (
                        <Grid
                           container
                           columns={9}
                           key={item.id}
                           className={clsx(s.container)}
                           margin={0}
                        >
                           <Grid
                              sm={3}
                              md={3}
                              xl={3}
                              className={clsx(s.item)}
                              margin={0}
                           >
                              <div className={clsx(s.productContainer)}>
                                 <img src={item.imgUrl} alt={item.name} />
                                 <div className={clsx(s.productInfo)}>
                                    <div className={clsx(s.productName)}>
                                       <h3>{item.shopOwner.shopName}</h3>
                                    </div>
                                    <div className={clsx(s.productShop)}>
                                       <h3>{item.name}</h3>
                                    </div>
                                 </div>
                              </div>
                           </Grid>
                           <Grid
                              sm={1}
                              md={1}
                              xl={1}
                              className={clsx(s.stockItem)}
                           >
                              {item.quantity}
                           </Grid>
                           <Grid
                              sm={1}
                              md={1}
                              xl={1}
                              className={clsx(s.priceItem)}
                           >
                              {item.discountedPrice}$
                           </Grid>

                           <Grid
                              margin={0}
                              sm={2}
                              md={2}
                              xl={2}
                              className={clsx(s.quantityItem)}
                           >
                              <div>
                                 <IconButton
                                    onClick={() => {
                                       dispatch(
                                          cartSlice.actions.changeQuantity({
                                             ...item,
                                             cartQuantity:
                                                item.cartQuantity - 1,
                                          })
                                       );
                                    }}
                                    disabled={item.quantity <= 1}
                                    color="Dominant1"
                                 >
                                    -
                                 </IconButton>
                                 <TextField
                                    value={item.cartQuantity}
                                    onChange={handleChangeQuantity(item)}
                                    sx={{
                                       input: {
                                          width: "3rem",
                                          fontSize: "2.4rem",
                                          color: "white",
                                       },
                                    }}
                                 />
                                 <IconButton
                                    onClick={() => {
                                       dispatch(
                                          cartSlice.actions.changeQuantity({
                                             ...item,
                                             cartQuantity:
                                                item.cartQuantity + 1,
                                          })
                                       );
                                    }}
                                    disabled={item.quantity >= item.stock}
                                    color="Dominant1"
                                 >
                                    +
                                 </IconButton>
                              </div>
                              <div>
                                 <span>asdfasdfasdfs</span>
                              </div>
                           </Grid>
                           <Grid
                              sm={1}
                              md={1}
                              xl={1}
                              className={clsx(s.totalPrice)}
                           >
                              {item.price * item.cartQuantity}$
                           </Grid>
                           <Grid
                              sm={1}
                              md={1}
                              xl={1}
                              className={clsx(s.remove)}
                           >
                              <div className={clsx(s.removeButton)}>
                                 <DeleteIcon
                                    sx={{ fontSize: "6rem", marginTop: "4rem" }}
                                    onClick={() => {
                                       dispatch(
                                          cartSlice.actions.removeItem(item)
                                       );
                                    }}
                                 ></DeleteIcon>
                              </div>
                           </Grid>
                        </Grid>
                     ))}
                  </Grid>
               </Grid>

               <div className={clsx(s.voucherContainer)}>
                  <Popup
                     className="addButton"
                     modal
                     trigger={<Button>Select voucher +</Button>}
                  >
                     {(close) => <Voucher close={close} />}
                  </Popup>
                  <div className={s.listVoucher}>
                     {vouchers.map((item) => {
                        if (item.checked) {
                           return (
                              <Chip
                                 key={item.id}
                                 icon={
                                    <DiscountIcon
                                       sx={{
                                          fontSize: "3rem",
                                          color: "#ffffff",
                                       }}
                                    />
                                 }
                                 sx={{
                                    fontSize: "2.4rem",
                                    padding: "2rem 1rem",
                                 }}
                                 label={`${item.code}: -${item.discount}$`}
                                 variant="outlined"
                                 onDelete={handleVoucherItemDelete(item)}
                                 color="error"
                              />
                           );
                        }
                     })}
                  </div>
               </div>
               <div className={clsx(s.totalOrders)}>
                  <p className={clsx(s.bill)}>Total orders: {total}$</p>
                  <Button>Order now</Button>
               </div>
            </div>
         ) : (
            <>
               <div className={s.emptyCart}>
                  <h1>Your cart is empty!</h1>
                  <img
                     src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/assetImage/asset/image/empty-cart.svg"
                     alt=""
                  />
               </div>
            </>
         )}
      </>
   );
}
