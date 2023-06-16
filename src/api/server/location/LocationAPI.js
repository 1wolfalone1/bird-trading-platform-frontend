import axios from "axios";
const url = "https://provinces.open-api.vn/api/p/";

export const apiGetPublicProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "https://vapi.vnappmob.com/api/province/",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicDistrict = (provinceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
