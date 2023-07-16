import s from "./header.module.scss";
import logo from "../../../asset/logo=light.svg";
import {
   Badge,
   Box,
   Button,
   IconButton,
   MenuItem,
   Select,
   Tab,
   Tabs,
} from "@mui/material";
import Style from "./../../../style/inline-style/style";
import clsx from "clsx";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCartShopping,
   faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { totalItemsSelector, userStatus } from "../../order/cartSlice";
import GuestRightHeader from "./guest-right-header/GuestRightHeader";
import { userInfoSelector } from "./../../../redux/global/userInfoSlice";
import UserRightHeader from "./user-right-header/UserRightHeader";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { birdApi } from "../../../api/server/products/BirdsAPI";
import globalConfigSlice, {
   navigateValueSelector,
} from "../../../redux/global/globalConfigSlice";
import { Suspense } from "react";
import { api } from "../../../api/server/API";
import productsPresentationSlices, {
   filterObjectSelector,
} from "../../../component/products-presentation/productsPresentationSlice";
import { filterByAll } from "../../../component/products-presentation/productsPresentationSlice";
library.add(faCartShopping);
const buttonStyle = {
   fontSize: "3.8rem",
   color: Style.color.$Dominant1,
   fontFamily: Style.font.$Secondary,
   fontWeight: 100,
   padding: "1.5rem 1rem",
   lineHeight: "100%",
   textTransform: "none",
};

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

   const handleSearch = () => {
      dispatch(filterByAll());
   };
   const onFormSubmit = async (e) => {
      try {
         e.preventDefault();
         dispatch(filterByAll());
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className={s.container}>
         <div className={s.logo}>
            <img
               src={
                  "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/assetImage/asset/Beige_Vintage_Elegant_Illustration_Bird_Logo_4.png"
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
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                  sx={{ fontSize: "2.4rem", height: "4rem" }}
                  MenuProps={{
                     disableScrollLock: true,
                     style: {
                        color: "white",
                     },
                  }}
               >
                  <MenuItem value={10} sx={{ fontSize: "2.4rem" }}>
                     Ten
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: "2.4rem" }}>
                     Twenty
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: "2.4rem" }}>
                     Thirty
                  </MenuItem>
               </Select>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                  sx={{
                     fontSize: "2.4rem",
                     height: "4rem",
                     marginLeft: "0.5rem",
                  }}
                  MenuProps={{
                     disableScrollLock: true,
                     style: {
                        color: Style.color.$Dominant1,
                     },
                  }}
               >
                  <MenuItem value={10} sx={{ fontSize: "2.4rem" }}>
                     Ten
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: "2.4rem" }}>
                     Twenty
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: "2.4rem" }}>
                     Thirty
                  </MenuItem>
               </Select>

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
