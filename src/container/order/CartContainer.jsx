import React, { useState } from "react";
import clsx from "clsx";
import s from "./cartContainer.module.scss";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import Popup from "reactjs-popup";
import Voucher from "../../component/order/Voucher";
import Style from '../../style/inline-style/style';
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
   const [cart, setCart] = useState(birdProducts);
   const handleRemove = (id) => {
      setCart((prevCart) => {
         return prevCart.filter((product) => product.id !== id);
      });
   };

   const handleIncrement = (id) => {
      const product = cart.find((x) => x.id === id);
      setCart(
         cart.map((x) =>
            x.id === id ? { ...product, quantity: product.quantity + 1 } : x
         )
      );
   };

   const handleDecrement = (id) => {
      setCart((prevCart) => {
         return prevCart.map((product) => {
            if (product.id === id && product.quantity > 0) {
               return { ...product, quantity: product.quantity - 1 };
            }
            return product;
         });
      });
   };

   let total = 0;
   cart.map((item) => {
      total += item.price * item.quantity;
   });

   return (
      <div>
         <p>Your cart have {cart.length} items</p>
         <Grid className={clsx(s.birdList)}>
            <Grid className={clsx(s.header)}>
               <Grid container columns={9}>
                  <Grid item sm={3} md={3} xl={3} className={clsx(s.item)}>
                     Item
                  </Grid>
                  <Grid item sm={1} md={1} xl={1} className={clsx(s.stockItem)}>
                     In Stock
                  </Grid>
                  <Grid item sm={1} md={1} xl={1} className={clsx(s.priceItem)}>
                     Price
                  </Grid>
                  <Grid
                     item
                     sm={2}
                     md={2}
                     xl={2}
                     className={clsx(s.quantityItem)}
                  >
                     Quantity
                  </Grid>
                  <Grid
                     item
                     sm={1}
                     md={1}
                     xl={1}
                     className={clsx(s.totalPrice)}
                  >
                     Total
                  </Grid>
                  <Grid item sm={1} md={1} xl={1} className={clsx(s.remove)}>
                     Remove
                  </Grid>
               </Grid>
            </Grid>

            <Grid className={clsx(s.bird)}>
               {cart.map((item) => (
                  <Grid
                     container
                     columns={9}
                     key={item.id}
                     className={clsx(s.container)}
                  >
                     <Grid item sm={3} md={3} xl={3} className={clsx(s.item)}>
                        <div className={clsx(s.productContainer)}>
                           <img src={item.image} alt={item.name} />
                           <div className={clsx(s.productInfo)}>
                              <div className={clsx(s.productName)}>
                                 <h3>{item.shop}</h3>
                              </div>
                              <div className={clsx(s.productShop)}>
                                 <h3>{item.name}</h3>
                              </div>
                           </div>
                        </div>
                     </Grid>
                     <Grid
                        item
                        sm={1}
                        md={1}
                        xl={1}
                        className={clsx(s.stockItem)}
                     >
                        {item.stock}
                     </Grid>
                     <Grid
                        item
                        sm={1}
                        md={1}
                        xl={1}
                        className={clsx(s.priceItem)}
                     >
                        {item.price}$
                     </Grid>

                     <Grid
                        item
                        sm={2}
                        md={2}
                        xl={2}
                        className={clsx(s.quantityItem)}
                     >
                        <Button
                           onClick={() => handleDecrement(item.id)}
                           disabled={item.quantity <= 1}
                        >
                           -
                        </Button>
                        <input
                           value={item.quantity}
                           onChange={(e) => {
                              return () =>{item.quantity = e.target.value}
                           }}
                           style={{width: '2rem', fontSize: '2rem', color: 'white'}}
                        />
                        <Button
                           onClick={() => handleIncrement(item.id)}
                           disabled={item.quantity >= item.stock}
                        >
                           +
                        </Button>
                     </Grid>
                     <Grid
                        item
                        sm={1}
                        md={1}
                        xl={1}
                        className={clsx(s.totalPrice)}
                     >
                        {item.price * item.quantity}$
                     </Grid>
                     <Grid item sm={1} md={1} xl={1} className={clsx(s.remove)}>
                        <div className={clsx(s.removeButton)}>
                           <DeleteIcon
                              sx={{ fontSize: "6rem", marginTop: "4rem" }}
                              onClick={() => handleRemove(item.id)}
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
         </div>
         <div className={clsx(s.totalOrders)}>
            <p className={clsx(s.bill)}>Total orders: {total}$</p>
            <Button>Order now</Button>
         </div>
      </div>
   );
}
