import React from "react";
import s from "./header.module.scss";
import logo from "../../../asset/logo=light.svg";
import {
   Button,
   FormControl,
   IconButton,
   InputBase,
   MenuItem,
   Select,
   alpha,
} from "@mui/material";
import Style from "./../../../style/inline-style/style";
import clsx from "clsx";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCartShopping,
   faMagnifyingGlass,
   faRightToBracket,
   faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
library.add(faCartShopping);
const buttonStyle = {
   fontSize: "4rem",
   color: Style.color.$Dominant1,
   fontFamily: Style.font.$Secondary,
   fontWeight: 100,
   padding: "1.5rem 1rem",
   lineHeight: "100%",
   textTransform: "none",
};

const buttonLogin = {
   textTransform: "none",
   fontFamily: Style.font.$Secondary,
   color: Style.color.$Dominant1,
   fontSize: "3.2rem",
   fontWeight: 100,
   lineHeight: "100%",
   padding: "1.55rem 3.3rem",
   "&.MuiButton-outlined": {
      border: "1px solid " + Style.color.$Dominant1,
   },
   borderRadius: 35,
};
export default function Header() {
   const [age, setAge] = React.useState("10");

   const handleChange = (e) => {
      setAge(e.target.value);
   };
   return (
      <div className={s.container}>
         <div className={s.logo}>
            <img src={logo} alt="logo" />
         </div>
         <div className={s.navLeft}>
            <div className={clsx(s.navCover, s.active)}>
               <Button variant="text" sx={buttonStyle} size="small">
                  Home
               </Button>
            </div>
            <div className={s.navCover}>
               <Button variant="text" sx={buttonStyle}>
                  Products
               </Button>
            </div>
         </div>
         <div className={s.searchBar}>
            <input
               type="text"
               placeholder="Search product here"
               className={clsx(s.searchInput)}
            />
            <div className={clsx(s.filter)}>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                  sx={{ fontSize: "2.4rem",height: "5rem"  }}
                  MenuProps={{
                     disableScrollLock: true,
                     style: {
                        color: "white",
                     }
                   }}
               >
                  <MenuItem value={10} sx={{ fontSize: "2.4rem" }}>
                     Ten
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: "2.4rem" }}>
                     Twenty
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: "2.4rem",  }}>
                     Thirty
                  </MenuItem>
               </Select>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                  sx={{ fontSize: "2.4rem", height: "5rem" }}
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
               <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className={clsx(s.icon)}
               />
            </div>
         </div>
         <div className={s.navRight}>
            <Button variant="outlined" sx={buttonLogin}>
               Sign in <FontAwesomeIcon icon={faRightToBracket} />
            </Button>
            <Button variant="outlined" sx={buttonLogin}>
               Sign up <FontAwesomeIcon icon={faUserPlus} />
            </Button>
            <IconButton color="Dominant1">
               <ShoppingCartOutlinedIcon
                  sx={{ fontSize: "5.5rem", color: Style.color.$Dominant1 }}
               />
            </IconButton>
         </div>
      </div>
   );
}
