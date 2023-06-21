import clsx from "clsx";
import s from "./createShop.module.scss";
import React, { useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import Style from "../../style/inline-style/style";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import ButtonGoogle from "../../component/buttonGoogle/ButtonGoogle";
import * as yup from "yup";
import { useFormik } from "formik";
import { registerAPI } from "../../api/server/RegisterAPI";
import { LoadingButton } from "@mui/lab";
import ReactQuill from "react-quill";

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

const buttonRegisterStyle = {
  textTransform: "none",
  fontSize: "2.4rem",
  width: "100%",
  padding: "1.2rem 0rem",
};
const formHelperText = {
  style: {
    fontSize: "1.6rem",
    color: "red",
    marginLeft: "0px",
  },
};
const validationSchema = yup.object({
  email: yup
    .string("")
    .email("Email address is not valid!")
    .required("Email is required!"),
  name: yup.string("").required("Name is required!"),
  phone: yup
    .string()
    .matches(/^(?!\D)/, "Phone number is not valid!")
    .required("Phone number is required!"),
  password: yup.string("").required("Password is required!"),
  confirmPassword: yup.string("").required("Confirm password is required!"),
  address: yup.string("").required("Address is required!"),
});
export default function CreateShop() {
  const [avatar, setAvatar] = useState();
  const [isVerifyProcess, setIsVerifyProcess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState("");
  const onFormSubmit = async (e) => {
    try {
      console.log(e);
      e.preventDefault();
      handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const form = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      matchPassword: "",
      address: "",
    },
    initialErrors: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      matchPassword: "",
      address: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleSubmit = async () => {
    console.log(form.values);
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
    if (form.isValid) {
      console.log(form.values);
      postRegister(form.values);
    }
  };
  const postRegister = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
      phoneNumber: values.phone,
      matchingPassword: values.confirmPassword,
      fullName: values.name,
    };
    try {
      setLoading(true);
      const response = await registerAPI.post("", payload);
      setLoading(false);
      setEmailConfirm(response.data);
      setIsVerifyProcess(true);
    } catch (e) {
      console.log(e);
      if (e.response.status === 406) {
        form.setErrors({ ...form.errors, email: "Email already exists!" });
      }
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

  console.log(form.errors);
  return (
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
      </Grid>
      <Grid sm={9} md={9} xl={9} className={clsx(s.contentRight)}>
        <div className={clsx(s.title)}>
          <span>Create Shop Account</span>
        </div>
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
          <Grid className={clsx(s.address)}>
            <TextField
              id="address"
              label="City, District, Ward, Street Name, Building, House No"
              variant="outlined"
              color="Dominant0"
              value={form.values.address}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.address && Boolean(form.errors.address)}
              helperText={form.touched.address && form.errors.address}
              FormHelperTextProps={formHelperText}
              sx={textFieldStyle}
              fullWidth
            />
          </Grid>

          {/* <ReactQuill 
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
         /> */}
          <Grid className={clsx(s.description)}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              color="Dominant0"
              value={form.values.description}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={
                form.touched.description && Boolean(form.errors.description)
              }
              helperText={form.touched.description && form.errors.description}
              FormHelperTextProps={formHelperText}
              sx={textFieldStyle}
              fullWidth
            />
          </Grid>

          <Grid className={clsx(s.button)}>
            <Button type="submit" className={clsx(s.iconButton)}>
              <LoadingButton
                sx={buttonRegisterStyle}
                variant="outlined"
                color="Accent7"
                fullWidth
                loading={loading}
                type="button"
                onClick={handleSubmit}
              >
                Create Account
              </LoadingButton>
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
