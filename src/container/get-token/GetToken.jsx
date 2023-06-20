import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api/server/API";
import { useDispatch } from "react-redux";
import userInfoSlice from "../../redux/global/userInfoSlice";
import { userStatus } from "../order/cartSlice";
import { errorAuthentication } from "../../config/constant";


export default function GetToken() {
   const location = useLocation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   useEffect(() => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      const status = params.get("status");
      if (token) {
         localStorage.setItem("token", JSON.stringify({ accessToken: token }));

         try {
            const getUserInfo = async () => {
               const res = await api.get(`/info${location.search}`);
               const data = await res.data;
               console.log(data)
               dispatch(
                  userInfoSlice.actions.changeAuthentication({
                     status: userStatus.USER,
                     info: data.userInfo,
                  })
               );
            };
            getUserInfo();
            navigate('/');
         } catch (err) {
            console.log(err);
         }
      } else if (status == 409) {
         navigate(`/login?error=${errorAuthentication.CONFLICT_GOOGLE_LOGIN}`);
      }
   }, []);
   return <div>GetToken</div>;
}
