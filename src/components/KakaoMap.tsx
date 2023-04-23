import React, { useEffect, useRef } from "react";
import Script from "next/script";
import Head from "next/head";

const filteredDistance = 5;

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

  const initMap = () => {
    if (containerRef.current) {
      const map = new kakao.maps.Map(containerRef.current, {
        center: new kakao.maps.LatLng(myLat, myLng),
        level: 8,
      });
      const createContent = () => {
        return `<div style="padding:0 5px;background:#fff;">${`내 주위로 ${filteredDistance}키로내 ${userListCount}명 있습니다.`}</div>`;
      };

      var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(myLat, myLng),
        map: map,
      });

      var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        content: createContent(),
        position: new kakao.maps.LatLng(myLat, myLng),
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 2.8, // 컨텐츠의 y 위치
      });

      var circle = new kakao.maps.Circle({
        map: map, // 원을 표시할 지도 객체
        center: new kakao.maps.LatLng(myLat, myLng),
        radius: filteredDistance * 1000,
        fillColor: "#CFE7FF", // 채움 색
        fillOpacity: 0.5, // 채움 불투명도
        strokeWeight: 3, // 선의 두께
        strokeColor: "#75B8FA", // 선 색
        strokeOpacity: 0.9, // 선 투명도
        strokeStyle: "solid", // 선 스타일
      });
    }
  };

  useEffect(() => {
    if (window?.kakao) {
      initMap();
    }
  }, [initMap, myLat, myLng]);

  return (
    <React.Fragment>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`}
        onLoad={() => kakao.maps.load(initMap)}
      />
      <Head>
        <link rel="preconnect" href="https://dapi.kakao.com" />
        <link rel="dns-prefetch" href="https://dapi.kakao.com" />
      </Head>

      <div id="map" ref={containerRef} className="shadow-md h-[500px] -lg:h-96 w-full" />
    </React.Fragment>
  );
};

export default React.memo(KakaoMap);
