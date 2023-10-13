import React, { useEffect, useRef } from "react";

interface KakaoMapProps {
  userListCount: number;
  myLat: number;
  myLng: number;
}
declare global {
  interface Window {
    kakao: any;
  }
  const kakao: any;
}

const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

const KakaoMap = ({ userListCount, myLat, myLng }: KakaoMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const createCustomOverlay = (map: any) => {
    const { kakao } = window;
    const content = `<div style="color:white;text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;">${`${5}키로내 ${userListCount}명을 발견했어요⚡`}</div>`;
    new kakao.maps.CustomOverlay({
      map,
      content,
      position: new kakao.maps.LatLng(myLat, myLng),
      xAnchor: 0.5,
      yAnchor: 0.5,
    });
  };

  const createCircle = (map: any) => {
    const { kakao } = window;
    new kakao.maps.Circle({
      map,
      center: new kakao.maps.LatLng(myLat, myLng),
      radius: 5 * 1000,
      fillColor: "#CFE7FF",
      fillOpacity: 0.5,
      strokeWeight: 3,
      strokeColor: "#75B8FA",
      strokeOpacity: 0.9,
      strokeStyle: "solid",
    });
  };

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = true;
    kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);
  }, []);

  useEffect(() => {
    if (containerRef.current && window?.kakao) {
      window.kakao.maps.load(() => {
        const { kakao } = window;
        const map = new kakao.maps.Map(containerRef.current, {
          center: new kakao.maps.LatLng(myLat, myLng),
          level: 8,
        });
        createCustomOverlay(map);
        createCircle(map);
      });
    }
  }, [myLat, myLng, userListCount]);

  return <div ref={containerRef} className="shadow-md h-[500px] -lg:h-96 w-full" />;
};

export default KakaoMap;
