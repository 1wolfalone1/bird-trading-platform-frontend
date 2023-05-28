import clsx from "clsx";
import s from "./sideBarFIlter.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Filter from "../../asset/icons/Filter";
import {
   Box,
   Button,
   Checkbox,
   Fade,
   FormControl,
   InputLabel,
   ListItemText,
   MenuItem,
   OutlinedInput,
   Popover,
   Popper,
   Rating,
   Select,
   TextField,
   Tooltip,
   Typography,
} from "@mui/material";
import Style from "./../../style/inline-style/style";
import Popup from "reactjs-popup";
import OutlineInputCustom from "../input/outlinedInput/OutlineInputCustom";
import ButtonControl from "./ButtonControl";
import UpStar from "../../asset/icons/UpStar";

const ratingCustomizer = {
   fontSize: "3.2rem",
   color: Style.color.$Dominant6,
};
const typeOfProduct = [
   "Oliver Hansen",
   "Van Henry",
   "April Tucker",
   "Ralph Hubbard",
   "Omar Alexander",
   "Carlos Abbott",
   "Miriam Wagner",
   "Bradley Wilkerson",
   "Virginia Andrews",
   "Kelly Snyder",
];
const typeOfSort = ["Increase", "Decrease"];
const MenuProps = {
   disableScrollLock: true,
   PaperProps: {
      style: {
         maxHeight: "20rem",
         width: 250,
         color: Style.color.$Dominant1,
         fontSize: "2rem",
      },
   },
};
const textFieldStyle = {
   input: {
      fontSize: "2rem",
   },
   label: {
      fontSize: "2rem",
   },
};
const selectStyle = {
   fontSize: "2rem",
};
const ratingValue = [5, 4, 3, 2, 1];

export default function SideBarFilter() {
   const ref = useRef();
   const [personName, setPersonName] = React.useState([]);
   const [openPopup, setOpenPopup] = useState(false);
   const closeModal = () => setOpenPopup(false);
   const [typeTextValue, setTypeTextValue] = useState("...");

   useEffect(() => {
      if (personName.length > 0) {
         setTypeTextValue(personName.join(", "));
      } else {
         setTypeTextValue("...");
      }
   }, [personName]);
   const handleChange = (event) => {
      const {
         target: { value },
      } = event;
      setPersonName(
         // On autofill we get a stringified value.
         typeof value === "string" ? value.split(",") : value
      );
   };

   console.log(openPopup);
   return (
      <div className={clsx(s.container)}>
         <div
            className={clsx(s.title)}
            onClick={() => {
               console.log("asfasfd");
               setOpenPopup((openPopup) => !openPopup);
            }}
         >
            <Filter className={s.iconFilter} /> <span>Search filter</span>
         </div>
         <div className={s.filterControl} ref={ref}>
            <div className={s.filterComponent}>
               <span className={s.title}>Type</span>
               <div className={s.filter}>
                  <Tooltip
                     title={
                        <Typography fontSize={15} color={Style.color.$Accent1}>
                           {typeTextValue}
                        </Typography>
                     }
                     TransitionComponent={Fade}
                     placement="right-end"
                  >
                     <FormControl color="Accent7" fullWidth>
                        <InputLabel
                           id="demo-multiple-checkbox-label"
                           sx={{ fontSize: "2rem" }}
                        >
                           Categories
                        </InputLabel>
                        <Select
                           multiple
                           value={personName}
                           onChange={handleChange}
                           input={<OutlinedInput label="Categories" />}
                           renderValue={(selected) => {
                              const renderValue = selected.join(", ");
                              setTypeTextValue(renderValue);
                              return renderValue;
                           }}
                           MenuProps={MenuProps}
                           fullWidth={true}
                           sx={selectStyle}
                        >
                           {typeOfProduct.map((name) => (
                              <MenuItem key={name} value={name}>
                                 <Checkbox
                                    checked={personName.indexOf(name) > -1}
                                    color="Dominant5"
                                 />
                                 <span style={{ fontSize: "2rem" }}>
                                    {name}
                                 </span>
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Tooltip>
                  <ButtonControl/>
               </div>
            </div>
            <div className={s.filterComponent}>
               <span className={s.title}>Rating</span>
               <div className={s.filter}>
                  {ratingValue.map((value) => (
                     <div
                        onClick={() => {}}
                        className={s.filterRating}
                        key={value}
                     >
                        <Rating
                           value={value}
                           readOnly={true}
                           sx={ratingCustomizer}
                        />{" "}
                        {value === 5 ? "" : (<>{' '}<UpStar/></>)}
                     </div>
                  ))}
               </div>
            </div>
            <div className={s.filterComponent}>
               <span className={s.title}>Price</span>
               <div className={clsx(s.filter)}>
                  <FormControl color="Accent7" fullWidth>
                     <InputLabel
                        id="demo-multiple-checkbox-label"
                        sx={{ fontSize: "2rem" }}
                     >
                        Sort price
                     </InputLabel>
                     <Select
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Categories" />}
                        renderValue={(selected) => {
                           const renderValue = selected.join(", ");
                           setTypeTextValue(renderValue);
                           return renderValue;
                        }}
                        MenuProps={MenuProps}
                        fullWidth={true}
                        sx={selectStyle}
                     >
                        {typeOfSort.map((name) => (
                           <MenuItem key={name} value={name}>
                              <span style={{ fontSize: "2rem" }}>{name}</span>
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>

                  <OutlineInputCustom
                     fs={"2rem"}
                     line={"1.6rem"}
                     color="Accent7"
                     label="From price"
                  />
                  <OutlineInputCustom
                     fs={"2rem"}
                     line={"1.6rem"}
                     color="Accent7"
                     label="To price"
                  />
                  <ButtonControl/>
               </div>
            </div>
         </div>
      </div>
   );
}
