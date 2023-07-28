import {
  Checkbox,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Rating,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpStar from "../../asset/icons/UpStar";
import OutlineInputCustom from "../input/outlinedInput/OutlineInputCustom";
import productsPresentationSlices, {
  categorySelector,
  filterByAll,
  filterObjectSelector,
  getTypeOfProduct,
  productTypeSelector,
} from "../products-presentation/productsPresentationSlice";
import Style from "./../../style/inline-style/style";
import ButtonControl from "./ButtonControl";
import s from "./sideBarFIlter.module.scss";

const ratingCustomizer = {
  fontSize: "3.2rem",
  color: Style.color.$Dominant6,
};

const typeOfSort = ["INCREASE", "DECREASE"];

const MenuProps = {
  disableScrollLock: true,
  PaperProps: {
    style: {
      maxHeight: "25rem",
      width: "10%",
      color: Style.color.$Dominant1,
      fontSize: "2rem",
      border: "0.1rem solid rgb(144, 69, 106)",
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
  const dispatch = useDispatch();

  const getProductType = useSelector(productTypeSelector);

  const getCategory = useSelector(categorySelector);

  const filterObj = useSelector(filterObjectSelector);

  const ref = useRef();

  const [listSlected, setListSlected] = React.useState([]);

  const [openPopup, setOpenPopup] = useState(false);

  const [typeTextValue, setTypeTextValue] = useState("...");

  const [valueRating, setValueRating] = useState(filterObj?.star);

  useEffect(() => {
    if (listSlected.length > 0) {
      const textValue = listSlected.map((a) => a.name).join(", ");
      setTypeTextValue(textValue);
    } else {
      setTypeTextValue("...");
    }
  }, [listSlected]);

  useEffect(() => {
    dispatch(getTypeOfProduct());
    setListSlected([]);
  }, [getCategory]);

  useEffect(() => {
    setValueRating(filterObj?.star);
  },[filterObj])

  const handleSelectTypeChange = (event) => {
    setValueRating(0);
    const {
      target: { value },
    } = event;
    setListSlected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const exist = filterObj.ListTypeId;
    const listId = value.map((a) => a.id);
    console.log(value);
    dispatch(
      productsPresentationSlices.actions.addToSelectedList({
        key: "",
        valueTemp: listId,
      })
    );
    console.log(value);
  };

  const handleSeletetedStar = (star) => {
    setValueRating(star);
    dispatch(
      productsPresentationSlices.actions.setStar({ key: "", star: star })
    );
    dispatch(productsPresentationSlices.actions.setPageNumber({pageNumber: 1}));
    dispatch(filterByAll());
  };

  const handleSortDirectChange = (event) => {
    setValueRating(0);
    const {
      target: { value },
    } = event;
    console.log(value);
    dispatch(
      productsPresentationSlices.actions.setSortDirection({
        key: "",
        direction: value,
      })
    );
  };

  return (
    <div className={clsx(s.container)}>
      <div
        className={clsx(s.title)}
        onClick={() => {
          setOpenPopup((openPopup) => !openPopup);
        }}
      ></div>
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
                  value={listSlected}
                  onChange={handleSelectTypeChange}
                  input={<OutlinedInput label="Categories" />}
                  renderValue={(selected) => {
                    return typeTextValue;
                  }}
                  MenuProps={MenuProps}
                  fullWidth={true}
                  sx={selectStyle}
                >
                  {getProductType.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      <Checkbox
                        checked={listSlected.indexOf(item) > -1}
                        color="Dominant5"
                      />
                      <span style={{ fontSize: "2rem" }}>{item.name}</span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Tooltip>
            <ButtonControl setListSlected={setListSlected} isType={true} setValueRating={setValueRating} />
          </div>
        </div>
        <div className={s.filterComponent}>
          <span className={s.title}>Rating</span>
          <div className={s.filter}>
            {ratingValue.map((value) => (
              <div
                onClick={() => handleSeletetedStar(value)}
                className={clsx(s.filterRating, {[s.backgroudColorHightLight] : value === valueRating})}
                key={value}
              >
                <Rating value={value} readOnly={true} sx={ratingCustomizer} />{" "}
                {value === 5 ? (
                  ""
                ) : (
                  <>
                    {" "}
                    <UpStar />
                  </>
                )}
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
                Sorted price by
              </InputLabel>
              <Select
                value={filterObj.sortPrice}
                onChange={handleSortDirectChange}
                input={<OutlinedInput label="Categories" />}
                renderValue={(selected) => {
                  return filterObj.sortPrice;
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
              label="From ($)"
              lower={true}
              setValueRating={setValueRating}
            />
            <OutlineInputCustom
              fs={"2rem"}
              line={"1.6rem"}
              color="Accent7"
              label="To ($)"
              lower={false}
              setValueRating={setValueRating}
            />
            <ButtonControl setValueRating={setValueRating}  />
          </div>
        </div>
      </div>
    </div>
  );
}
