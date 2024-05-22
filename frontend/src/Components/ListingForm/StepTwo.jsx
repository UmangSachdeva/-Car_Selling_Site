import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import axios from "axios";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Autosuggest from "react-autosuggest";

import "leaflet/dist/leaflet.css";
import { Autocomplete, TextField } from "@mui/material";
import { get, useFormContext } from "react-hook-form";
const center = {
  lat: 51.505,
  lng: -0.09,
};

let searchTimeout;

function StepTwo() {
  const { setValue, register, getValues, formState: { errors } } = useFormContext();

  const [position, setPosition] = useState(center); // Default position
  const markerRef = useRef(null);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const errorInput = get(errors, "location.address")

  const RecenterAutomatically = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([position?.lat, position?.lng]);
    }, [position]);
    return null;
  };

  console.log(errors)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  const handleSearchChange = async (value) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
      try {

        const response = await axios.get(
          `https://geocode.maps.co/search?q=${value}&api_key=${process.env.REACT_APP_LOCATION_API}`
        );

        setSuggestions(response.data);
      } catch (error) {
        setError(true);
        console.error("Error fetching suggestions:", error);
      }
    }, 500);
  };

  const handleInputSelect = (value) => {

    setValue("location.cordinates", [value?.lat || center.lat, value?.lon || center?.lng])
    setValue("location.address", value?.display_name)
    setPosition({
      lat: value?.lat || center.lat,
      lng: value?.lon || center?.lng,
    });
    setAddress(value?.display_name);
  };

  useEffect(() => {
    if (!getValues("location")) {
      setValue("location", {})
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-left capitalize text-[#d32f2f] mx-[14px] mt-[3px]">{errorInput?.message}</p>
        <input {...register("location")} type="text" className="hidden" name="location" />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Autocomplete
          className="text-dark-black"
          options={suggestions}
          getOptionLabel={(option) => option?.display_name}
          onChange={(event, newValue) => {
            handleInputSelect(newValue);
          }}
          classes={{
            paper: "bg-light-yellow border border-dark-black",
            clearIndicator: "text-dark-black=",
            root: "text-dark-black",
            popupIndicator: "text-dark-black",
          }}
          onInputChange={(e, value) => {
            handleSearchChange(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search for a location..." />
          )}
        />
      </div>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {address && position?.lat && position?.lng && (
          <Marker
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
            eventHandlers={eventHandlers}
            ref={markerRef}
            position={position}
          >
            <Popup>Address: {address}</Popup>
          </Marker>
        )}
        <RecenterAutomatically />
      </MapContainer>
    </div>
  );
}

export default StepTwo;
