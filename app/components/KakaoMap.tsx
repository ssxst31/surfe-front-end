"use client";

import Script from "next/script";
import { Map, MapMarker, Circle } from "react-kakao-maps-sdk";
import { getDistance } from "app/utils/map";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false`;

const filteredDistance = 5;

const KakaoMap = () => {
  const pins = [
    {
      id: 1,
      lat: 37.497,
      lng: 127.03,
    },
    {
      id: 2,
      lat: 37.497,
      lng: 127.1,
    },
    {
      id: 3,
      lat: 37.5,
      lng: 127.05,
    },
  ];

  const countPerson = () => {
    let count = 0;
    for (let i = 0; i < pins.length; i++) {
      if (getDistance(37.497, 127.0254, pins[i].lat, pins[i].lng) / 1000 < filteredDistance) {
        count++;
      }
    }

    return count;
  };

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map center={{ lat: 37.497, lng: 127.0254 }} style={{ width: "100%", height: "360px" }}>
        <Circle
          center={{
            lat: 37.497,
            lng: 127.0254,
          }}
          radius={filteredDistance * 1000}
          strokeWeight={5}
          strokeColor={"#75B8FA"}
          strokeOpacity={2}
          strokeStyle={"dash"}
          fillColor={"#CFE7FF"}
          fillOpacity={0.7}
        />
        <MapMarker position={{ lat: 37.497, lng: 127.0254 }}>
          <div
            style={{ color: "#000", width: 230 }}
          >{`내 주위로 ${filteredDistance}키로내 ${countPerson()}명 있습니다.`}</div>
        </MapMarker>
        {pins.map((pin) => (
          <MapMarker
            position={{ lat: pin.lat, lng: pin.lng }}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              size: {
                width: 24,
                height: 35,
              },
            }}
          />
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
