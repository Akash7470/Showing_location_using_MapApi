import * as React from "react";
import { useRef, useLayoutEffect, useState } from "react";

export const Map = () => {
  const [mapObj, setMapObj] = useState({});
  const [locationSearch, setlocationSearch] = useState("");

  console.log("map obj :- ", mapObj);

  const mapRef = useRef(null);

  const mapData = (e) => {
    console.log("e-- :- ", e);
    const onResult = function (result) {
      const H = window.H;
      let locations = result.Response.View[0].Result,
        position,
        marker;
      console.log(locations, "----------");

      // Add a marker for each location found'
      const svgMarkup =
        '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="roboto" font-weight="bold" text-anchor="middle" ' +
        'fill="white">A</text></svg>';
      const icon = new H.map.Icon(svgMarkup);

      for (let i = 0; i < locations.length; i++) {
        position = {
          lat: locations[i].Location.DisplayPosition.Latitude,
          lng: locations[i].Location.DisplayPosition.Longitude,
        };
        marker = new H.map.Marker(position, { icon: icon });
        mapObj.hMap.addObject(marker);
        // hMap.setCenter(position);
      }
    };

    const geocoder = mapObj.platform.getGeocodingService();

    geocoder.geocode(
      { searchText: `${locationSearch}` },
      onResult,
      function (e) {
        alert(e);
      }
    );
  };

  useLayoutEffect(() => {
    if (!mapRef.current) return;
    const H = window.H;

    const platform = new H.service.Platform({
      apikey: "iqTe3reNScC6Dz6O-YvTrwOjU9qNzmu9mRHw12um4lI",
    });

    const defaultLayers = platform.createDefaultLayers();

    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 30, lng: 60 },
      zoom: 4,
      pixelRatio: window.devicePixelRatio || 1,
    });
    setMapObj({ hMap, platform });
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    return () => {
      hMap.dispose();
    };
  }, [mapRef]);

  const handleSearch = (e) => {
    console.log(e.key);
    setlocationSearch(e.target.value);
  };

  return (
    <>
      <div
        className="map"
        ref={mapRef}
        style={{ height: "100vh", width: "150vw" }}
        onClick={mapData}
      >
        <input
          className="px-5"
          style={{ width: "20vw", height: "10vh" }}
          onChange={handleSearch}
          type="text"
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </div>
    </>
  );
};
