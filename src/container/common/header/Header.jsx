import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import productsPresentationSlices, {
  filterByAll,
  filterObjectSelector,
} from "../../../component/products-presentation/productsPresentationSlice";
import globalConfigSlice, {
  navigateValueSelector,
} from "../../../redux/global/globalConfigSlice";
import { totalItemsSelector, userStatus } from "../../order/cartSlice";
import { userInfoSelector } from "./../../../redux/global/userInfoSlice";
import Style from "./../../../style/inline-style/style";
import GuestRightHeader from "./guest-right-header/GuestRightHeader";
import s from "./header.module.scss";
import UserRightHeader from "./user-right-header/UserRightHeader";
library.add(faCartShopping);

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const value = useSelector(navigateValueSelector);
  const [age, setAge] = useState("10");
  const totalCartItems = useSelector(totalItemsSelector);
  const dispatch = useDispatch();
  const filterObj = useSelector(filterObjectSelector);

  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      !window.location.pathname.toString().startsWith("/products")
    ) {
      dispatch(globalConfigSlice.actions.changeNavigateValue(3));
    }
  }, [location]);
  const user = useSelector(userInfoSelector);
  console.log(user);
  const handleNavChange = (event, newValue) => {};

  const handleChange = (e) => {
    setAge(e.target.value);
  };

  const handleChangeName = (event) => {
    const { name, value } = event.target;
    dispatch(
      productsPresentationSlices.actions.setName({ key: "", name: value })
    );
    console.log(value);
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(filterByAll());
    } catch (error) {
      console.error(error);
    }
    navigate("/products");
  };

  return (
    <div className={s.container}>
      <div className={s.logo}>
        <img
          src={
            "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/logo%3Dlight.svg"
          }
          alt="logo"
        />
      </div>
      <div className={s.navLeft}>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleNavChange}
            aria-label="wrapped label tabs example"
            color="Dominant1"
            className={clsx(s.tabs)}
            TabIndicatorProps={{
              sx: {
                backgroundColor: Style.color.$Accent1,
              },
            }}
          >
            <Tab value={1} label="Home" onClick={() => navigate("/")} />
            <Tab
              value={2}
              label="Products"
              onClick={() => navigate("/products")}
            />
            <Tab value={3} label="" className={clsx(s.tabnone)} />
          </Tabs>
        </Box>
      </div>
      <form onSubmit={onFormSubmit} className={s.searchBar}>
        <input
          value={filterObj.name}
          type="text"
          placeholder="Type to search..."
          className={clsx(s.searchInput)}
          onChange={handleChangeName}
        />
        <div className={clsx(s.filter)}>
          <IconButton type="submit">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={clsx(s.icon)}
            />
          </IconButton>
        </div>
      </form>
      {user.status === userStatus.USER ? (
        <UserRightHeader user={user} totalCartItems={totalCartItems} />
      ) : (
        <GuestRightHeader totalCartItems={totalCartItems} />
      )}
      {/* {
            <Button
               onClick={() => {
                  const a = async () => {
                     try {
                        const id = [1, 2, 3, 4, 5];

                        const res = await api.get("/products/id", {
                           params: {
                              id: [1, 2, 3, 4, 5, 7, 8],
                              sort: 1,
                              from: 100,
                              to: 200
                           }
                        });
                        console.log(res);
                        const data = await res.data;
                     } catch (err) {
                        console.log(err);
                     }
                  };
                  a();
               }}
            >
            </Button>
         } */}
    </div>
  );
}
