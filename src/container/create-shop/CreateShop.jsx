import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormHelperText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Unstable_Grid2";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { api } from "../../api/server/API";
import MapControl from "../../component/map-control/MapControl";
import Style from "../../style/inline-style/style";
import { dataAsyncUrlToFile, objectToBlob } from "../../utils/myUtils";
import s from "./createShop.module.scss";
const textFieldStyle = {
  input: {
    color: Style.color.$Complementary0,
    fontSize: "1.8rem",
    fontFamily: Style.font.$Primary,
  },
  label: {
    fontSize: "1.8rem",
  },
  ".MuiOutlinedInput-notchedOutline legend": {
    fontSize: "1.5rem",
  },
};

const cssButton = {
  border: "1px solid #000000",
  padding: "1rem 3rem",
  fontSize: "2.4rem",
  textTransform: "none",
  color: "rgb(255, 255, 255)",
  marginLeft: "1rem",
  backgroundColor: "rgb(94, 94, 94)",
  fontWeight: "normal",
  fontFamily: "SeoulHangang",
  "&:hover": { color: " rgb(30, 0, 7)", backgroundColor: "rgb(228, 223, 209)" },
};

const cancelButton = {
  border: "1px solid black",
  fontSize: "2.4rem",
  fontFamily: "SeoulHangang",
  padding: "1rem 2rem",
  textTransform: "none",
  color: "rgb(255, 255, 255)",
  backgroundColor: "rgb(94, 94, 94)",
  "&:hover": {
    backgroundColor: "#ef2933",
  },
};

const QuillWrapper = ({ field, form, ...props }) => {
  const { name } = field;
  const { setFieldValue } = form;
  const { value } = field;
  const handleChange = (content) => {
    setFieldValue(name, content);
  };
  return (
    <ReactQuill
      {...props}
      value={value}
      onChange={handleChange}
      onBlur={() => form.setFieldTouched(name, true)}
    />
  );
};
// const buttonCreate = {
//   textTransform: "none",
//   fontSize: "2.4rem",
//   padding: ""
// };
const formHelperText = {
  style: {
    fontSize: "1.6rem",
    color: "red",
    marginLeft: "0px",
  },
};
const validationSchema = yup.object({
  name: yup.string("").required("Name is required!"),
  phone: yup
    .string()
    .matches(/^0\d{9,10}$/, "Phone number is not valid!")
    .required("Phone number is required!"),
  description: yup
    .string()
    .min(100, "Description must be at least 100 characters long")
    .required("Description is required!"),
});
export default function CreateShop() {
  const [openModel, setOpenModel] = useState(false);
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [triggers, setTriggers] = useState(0);
  const [errorCustom, setErrorCustom] = useState({
    avatar: "",
    address: "",
  });
  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const form = useFormik({
    initialValues: {
      name: "",
      address: "",
      description: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {}, [address]);

  const handleSubmit = async () => {
    const e = await form.validateForm(form.values);
    form.setTouched(
      {
        email: true,
        name: true,
        address: true,
        phone: true,
        password: true,
        confirmPassword: true,
      },
      false
    );

    if (form.values.password !== form.values.confirmPassword) {
      form.setErrors({
        ...e,
        confirmPassword: "Confirm password not match!",
      });
    } else {
      form.setErrors({
        ...e,
      });
    }
    let count = 0;
    if (avatar?.obj === undefined) {
      count++;
      setErrorCustom((state) => {
        return { ...state, avatar: "Shop avatar is required!" };
      });
    }
    if (!address) {
      count++;
      setErrorCustom((state) => {
        return { ...state, address: "Address is required!" };
      });
    }
    if (form.isValid) {
      if (count === 0) {
        postRegister(form.values);
      }
    }
  };
  const postRegister = async (values) => {
    const dataTransfer = {
      phoneShop: +values.phone,
      shopName: values.name,
      description: values.description,
      shopAddress: address,
    };
    try {
      setLoading(true);
      const formData = new FormData();
      const avatarBlob = await dataAsyncUrlToFile(avatar.src);
      formData.append("image", avatarBlob);
      const dataBlob = objectToBlob(dataTransfer);
      formData.append("data", dataBlob);
      const response = await api.post("/shop-owner", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      const data = await response.data;
      handleNavigateToShop();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e.response.status === 406) {
        form.setErrors({ ...form.errors, email: "Email already exists!" });
      }
    }
  };
  const handleNavigateToShop = async () => {
    try {
      const res = await api.get("/shop-owner/redirect");
      const data = await res.data;
      if (data.successMessage) {
        window.location.href = data.successMessage; // Redirect to the desired page
      }
    } catch (e) {
      console.log(e, "error create shop");
    }
  };
  const handleUpdateAvatar = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const newAvatar = reader.result;
      setAvatar({
        src: newAvatar,
        obj: files[0],
      });
    };
    if (files[0]) reader?.readAsDataURL(files[0]);
  };

  return (
    <>
      <div className={clsx(s.title)}>
        <span>Create Shop Account</span>
      </div>
      <Grid container className={clsx(s.container)}>
        <Grid sm={3} md={3} xl={3} className={clsx(s.uploadImg)}>
          <div className={clsx(s.imgProfile)}>
            <img
              src={
                avatar?.src ||
                "https://static.thenounproject.com/png/5034901-200.png"
              }
              alt="Avatar"
            />
          </div>
          <input
            type="file"
            name="avatar"
            id="customFile"
            hidden
            onChange={handleUpdateAvatar}
          />
          <label className={clsx(s.editProfile)} htmlFor="customFile">
            Choose Avatar
          </label>
          {!avatar?.obj ? (
            <FormHelperText error sx={{ fontSize: "1.6rem" }}>
              {errorCustom.avatar}
            </FormHelperText>
          ) : (
            ""
          )}
        </Grid>

        <Grid sm={9} md={9} xl={9} className={clsx(s.contentRight)}>
          <form onSubmit={onFormSubmit} className={clsx(s.formBordered)}>
            <Grid container spacing={1} className={clsx(s.info)}>
              <Grid sm={6} md={6} xl={6} className={clsx(s.password)}>
                <TextField
                  id="name"
                  label="Shop Name"
                  variant="outlined"
                  color="Dominant0"
                  value={form.values.name}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.touched.name && Boolean(form.errors.name)}
                  helperText={form.touched.name && form.errors.name}
                  sx={textFieldStyle}
                  FormHelperTextProps={formHelperText}
                  fullWidth
                />
              </Grid>
              <Grid sm={6} md={6} xl={6} className={clsx(s.password)}>
                <TextField
                  id="phone"
                  label="Phone Number"
                  variant="outlined"
                  color="Dominant0"
                  value={form.values.phone}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.touched.phone && Boolean(form.errors.phone)}
                  helperText={form.touched.phone && form.errors.phone}
                  sx={textFieldStyle}
                  FormHelperTextProps={formHelperText}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              className={clsx(s.address)}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Tooltip
                title={
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                    {address}
                  </Typography>
                }
              >
                <Grid container sx={{ width: "100%" }}>
                  <Grid
                    xs={9}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #6a6a6a",
                      borderRadius: "5px",
                      padding: "0",
                    }}
                  >
                    <Typography
                      noWrap
                      sx={{
                        fontSize: "1.8rem",
                        paddingLeft: "1rem",
                        color: "#7d7d7d",
                        width: "100%",
                      }}
                    >
                      {address ? address : "Provide your shop address"}
                    </Typography>
                  </Grid>
                  <Grid xs={3} sx={{ display: "flex" }}>
                    <Button
                      color="Accent8"
                      sx={cssButton}
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        setOpenModel(true);
                        setTriggers(0);
                      }}
                    >
                      Change
                    </Button>
                  </Grid>
                </Grid>
              </Tooltip>
              {!address ? (
                <FormHelperText error sx={{ fontSize: "1.6rem" }}>
                  {errorCustom.address}
                </FormHelperText>
              ) : (
                ""
              )}
            </Grid>
            <Grid>
              <QuillWrapper
                placeholder="Write description about your shop..."
                field={form.getFieldProps("description")}
                form={form}
              />
              {form.touched.description && form.errors.description && (
                <FormHelperText error sx={{ fontSize: "1.6rem" }}>
                  {form.errors.description}
                </FormHelperText>
              )}
            </Grid>

            <Grid className={clsx(s.button)}>
              <LoadingButton
                sx={cssButton}
                color="Accent7"
                endIcon={<AddBusinessIcon sx={{ fontSize: "3rem" }} />}
                loading={loading}
                type="button"
                loadingPosition="end"
                onClick={handleSubmit}
                variant="contained"
              >
                Create Shop
              </LoadingButton>
            </Grid>
          </form>
        </Grid>
        <Modal
          open={openModel}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className={s.model}>
            <MapControl
              address={address}
              setAddress={setAddress}
              triggerSave={triggers}
              w="70rem"
              h="40rem"
              setOpenModel={setOpenModel}
            />
            <div className={s.buttonControl}>
              <div className={clsx(s.cancelButton)}>
                <Button
                  onClick={() => {
                    setOpenModel(false);
                    setTriggers(0);
                  }}
                  variant="contained"
                  color="Accent8"
                  sx={cancelButton}
                >
                  Cancel
                </Button>
              </div>
              <div className={clsx(s.saveChange)}>
                <Button
                  variant="contained"
                  color="Accent8"
                  sx={{ fontSize: "1.6rem" }}
                  onClick={() => setTriggers((state) => state + 1)}
                >
                  Save Change
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </Grid>
    </>
  );
}
