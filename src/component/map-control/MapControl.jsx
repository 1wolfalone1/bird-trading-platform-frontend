import {
   Box,
   Button,
   ButtonGroup,
   IconButton,
   Skeleton,
   TextField,
   Typography,
} from "@mui/material";
import s from "./mapControl.module.scss";
import {
   useJsApiLoader,
   GoogleMap,
   Marker,
   Autocomplete,
   DirectionsRenderer,
   useGoogleMap,
} from "@react-google-maps/api";
import clsx from "clsx";
import { useEffect } from "react";
import { useRef, useState } from "react";
const lib = ["places"];
const center = { lat: 48.8584, lng: 2.2945 };

function MapControl({ address, setAddress }) {
   const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: "AIzaSyApYxFyr-42__SnJKnFCSDBM34rpkopYnU",
      libraries: lib,
   });
   const [map, setMap] = useState(/** @type google.maps.Map */ (null));
   const [directionsResponse, setDirectionsResponse] = useState(null);
   const [distance, setDistance] = useState("");
   const [duration, setDuration] = useState("");
   const [origin, setOrigin] = useState("");
   const [destination, setDestination] = useState("");
   /** @type React.MutableRefObject<HTMLInputElement> */
   const originRef = useRef();
   /** @type React.MutableRefObject<HTMLInputElement> */
   const destiantionRef = useRef();
   useEffect(() => {
      console.log(originRef);
      if (originRef !== undefined && originRef.current !== undefined) {
      }
   }, []);
   if (!isLoaded) {
      return <Skeleton />;
   }

   const checkValidAddress = async (addr) => {
      // eslint-disable-next-line no-undef
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
         {
            address: addr,
         },
         function (results, status) {
            // eslint-disable-next-line no-undef
            if (
               // eslint-disable-next-line no-undef
               status === google.maps.GeocoderStatus.OK &&
               results.length > 0
            ) {
               console.log(status, " successfully", results);
               // set it to the correct, formatted address if it's valid
               addr = results[0].formatted_address;
            } else {
               console.log(status, " failed", results);
               // show an error if it's not
            }
         }
      );
   };
   async function calculateRoute() {
      if (
         originRef.current.value === "" ||
         destiantionRef.current.value === ""
      ) {
         return;
      }

      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();

      const origin2 = await checkValidAddress(originRef.current.value);
      const destination2 = await checkValidAddress(
         destiantionRef.current.value
      );
      console.log(origin2, " ", destination2);
      const results = await directionsService.route({
         origin: originRef.current.value,
         destination: destiantionRef.current.value,
         // eslint-disable-next-line no-undef
         travelMode: google.maps.TravelMode.DRIVING,
      });
      console.log(results);
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
   }

   function clearRoute() {
      setDirectionsResponse(null);
      setDistance("");
      setDuration("");
      originRef.current.value = "";
      destiantionRef.current.value = "";
   }

   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            width: "700px",
            gap: 1,
         }}
         className={clsx(s.container)}
      >
         <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ flex: 1 }}>
               <Autocomplete className={"autocomplete"}>
                  <TextField
                     inputRef={originRef}
                     ref={originRef}
                     defaultValue={address}
                     type="text"
                     placeholder="Origin"
                     autoComplete="off"
                     id="outlined-basic"
                     label="Enter Place"
                     variant="outlined"
                     sx={{
                        label: {
                           fontSize: "1.6rem",
                        },
                        input: {
                           fontSize: "1.6rem",
                        },
                        "& .MuiOutlinedInput-notchedOutline legend": {
                           fontSize: "1.2rem",
                        },
                     }}
                     fullWidth
                  />
               </Autocomplete>
            </Box>
            <Box sx={{ flexShrink: 0, display: "flex", gap: 0.5 }}>
               <Button
                  variant="contained"
                  color="Accent8"
                  type="reset"
                  onClick={calculateRoute}
                  sx={{ fontSize: "1.5rem" }}
               >
                  Cancel
               </Button>
            </Box>
            {/* <Typography>Distance: {distance} </Typography>
            <Typography>Duration: {duration} </Typography>
            <IconButton
               aria-label="center back"
               isRound
               onClick={() => {
                  map.panTo(center);
                  map.setZoom(15);
               }} */}
         </Box>
         <Box sx={{ width: "100%", height: "200px" }}>
            {/* Google Map Box */}
            <GoogleMap
               center={center}
               zoom={15}
               mapContainerStyle={{ width: "100%", height: "100%" }}
               options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
               }}
               onLoad={(map) => setMap(map)}
            >
               <Marker position={center} />
               {directionsResponse && (
                  <DirectionsRenderer directions={directionsResponse} />
               )}
            </GoogleMap>
         </Box>
      </Box>
   );
}

export default MapControl;
