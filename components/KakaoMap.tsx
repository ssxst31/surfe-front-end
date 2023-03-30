import Script from "next/script";
import { Map, MapMarker, Circle } from "react-kakao-maps-sdk";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false`;

const filteredDistance = 5;

const KakaoMap = ({ userListCount, myLat, myLng }: any) => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map center={{ lat: myLat, lng: myLng }} level={7} className="shadow-md h-[500px] -sm:h-96 w-full">
        <Circle
          center={{
            lat: myLat,
            lng: myLng,
          }}
          radius={filteredDistance * 1000}
          strokeWeight={5}
          strokeColor={"#75B8FA"}
          strokeOpacity={2}
          strokeStyle={"dash"}
          fillColor={"#CFE7FF"}
          fillOpacity={0.7}
        />
        <MapMarker position={{ lat: myLat, lng: myLng }}>
          <div
            style={{ color: "#000", width: 230 }}
          >{`내 주위로 ${filteredDistance}키로내 ${userListCount}명 있습니다.`}</div>
        </MapMarker>
      </Map>
    </>
  );
};

export default KakaoMap;
