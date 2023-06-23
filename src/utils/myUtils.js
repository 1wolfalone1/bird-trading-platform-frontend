export const dataUrlToFile = (url, fileName) => {
   const [mediaType, data] = url.split(",");

   const mime = mediaType.match(/:(.*?);/)?.[0];

   var n = data.length;

   const arr = new Uint8Array(n);

   while (n--) {
      arr[n] = data.charCodeAt(n);
   }

   return new File([arr], fileName, { type: mime });
};
export const dataAsyncUrlToFile = async (dataUrl, fileName) => {
   const res = await fetch(dataUrl);
   const blob = await res.blob();
   const contentType = await res.headers.get("content-type");
   console.log(contentType, "content-type");
   return new File([blob], fileName, { type: contentType });
};

export const objectToBlob = (object) => {
   const json = JSON.stringify(object);

   // Create a Blob from the JSON string
   const blob = new Blob([json], {
      type: "application/json",
   });
   return blob;
};

export const calculateDistance = async (origin, destination) => {
   console.log(origin, destination, 'adsfasdf conalulatetetetetet');
   // eslint-disable-next-line no-undef
   const directionsService = new google.maps.DirectionsService();
   const results = await directionsService.route({
      origin: origin,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
   });

   return results.routes[0].legs[0].distance.value;
};

export const formatNumber = (q) => {
  return q.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
