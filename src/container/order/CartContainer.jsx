import React from "react";
import clsx from "clsx";
import s from "./cartContainer.module.scss";
import { Button, Chip, IconButton, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import Popup from "reactjs-popup";
import Voucher from "../../component/order/Voucher";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, {
  getListItemSelector,
  getVoucherSelectedSelector,
  totalPriceSelector,
} from "./cartSlice";
import DiscountIcon from "@mui/icons-material/Discount";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { userInfoSelector } from "../../redux/global/userInfoSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const voucherSelected = useSelector(getVoucherSelectedSelector);
  console.log(voucherSelected);
  const total = useSelector(totalPriceSelector);
  const carts = useSelector(getListItemSelector);
  const navigate = useNavigate();
  const { status } = useSelector(userInfoSelector);
  console.log("info", status);
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

  const handleVoucherItemDeleteShipping = (item) => {
    return () => {
      dispatch(cartSlice.actions.removeVoucher(item));
    };
  };

  const handleVoucherItemDeleteDiscount = (item) => {
    return () => {
      dispatch(cartSlice.actions.removeVoucher(item));
    };
  };

  const handleOrderNowClick = () => {
    if (status === 0) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  const formatNumber = (q) => {
    return q.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
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
                <Grid sm={1} md={1} xl={1} className={clsx(s.stockItem)}>
                  In Stock
                </Grid>
                <Grid sm={1} md={1} xl={1} className={clsx(s.priceItem)}>
                  Price
                </Grid>
                <Grid sm={2} md={2} xl={2} className={clsx(s.quantityItem)}>
                  Quantity
                </Grid>
                <Grid sm={1} md={1} xl={1} className={clsx(s.totalPrice)}>
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
                          <h3>{item.name}</h3>
                        </div>
                        <div className={clsx(s.shopName)}>
                          <h3>Shop: {item?.shopOwner?.shopName}</h3>
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <Grid sm={1} md={1} xl={1} className={clsx(s.stockItem)}>
                    {item.quantity}
                  </Grid>
                  <Grid sm={1} md={1} xl={1} className={clsx(s.priceItem)}>
                    {formatNumber(item.discountedPrice)}
                  </Grid>

                  <Grid
                    margin={0}
                    sm={2}
                    md={2}
                    xl={2}
                    className={clsx(s.quantityItem)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          dispatch(
                            cartSlice.actions.changeQuantity({
                              ...item,
                              cartQuantity: +item.cartQuantity - 1,
                            })
                          );
                        }}
                        disabled={item.cartQuantity <= 1}
                        color="Dominant1"
                      >
                        <RemoveCircleOutlineIcon
                          sx={{
                            fontSize: "4rem",
                            color: "#b3f684",
                          }}
                        />
                      </IconButton>
                      <TextField
                        value={item.cartQuantity}
                        onChange={handleChangeQuantity(item)}
                        sx={{
                          input: {
                            width: "3rem",
                            height: "2rem",
                            fontSize: "2.4rem",
                            color: "#b3f684",
                          },
                        }}
                      />
                      <IconButton
                        onClick={() => {
                          dispatch(
                            cartSlice.actions.changeQuantity({
                              ...item,
                              cartQuantity: +item.cartQuantity + 1,
                            })
                          );
                        }}
                        disabled={item.cartQuantity >= item.quantity}
                        color="Dominant1"
                      >
                        <AddCircleOutlineIcon
                          sx={{
                            fontSize: "4rem",
                            color: "#b3f684",
                          }}
                        />
                      </IconButton>
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "1.6rem",
                          color: "red",
                        }}
                      >
                        {item.notValidMessage}
                      </span>
                    </div>
                  </Grid>
                  <Grid sm={1} md={1} xl={1} className={clsx(s.totalPrice)}>
                    {formatNumber(item.discountedPrice * item.cartQuantity)}
                  </Grid>
                  <Grid sm={1} md={1} xl={1} className={clsx(s.remove)}>
                    <div className={clsx(s.removeButton)}>
                      <DeleteIcon
                        sx={{ fontSize: "6rem", marginTop: "4rem" }}
                        onClick={() => {
                          dispatch(cartSlice.actions.removeItem(item));
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
              {voucherSelected.shipping && (
                <>
                  <Chip
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
                    label={`${voucherSelected.shipping?.name}`}
                    variant="outlined"
                    onDelete={handleVoucherItemDeleteShipping(
                      voucherSelected.shipping
                    )}
                    color="error"
                  />
                </>
              )}

              {voucherSelected.discount && (
                <>
                  <Chip
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
                    label={`${voucherSelected.discount?.name}: -${voucherSelected.discount?.discount}$`}
                    variant="outlined"
                    onDelete={handleVoucherItemDeleteDiscount(
                      voucherSelected.discount
                    )}
                    color="error"
                  />
                </>
              )}
            </div>
          </div>
          <div className={clsx(s.totalOrders)}>
            <p className={clsx(s.bill)}>Total orders: {formatNumber(total)}</p>
            <Button onClick={handleOrderNowClick}>Order now</Button>
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
