/*global kakao*/

import Script from "next/script";
import React, { Dispatch, SetStateAction } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203; // 33.450701
const DEFAULT_LNG = 127.03088379; // 126.570667

const DEFAULT_ZOOM = 3;

interface MapProps {
  setMap: Dispatch<SetStateAction<any>>;
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export default function Map({ setMap, lat, lng, zoom }: MapProps) {
  const loadKakaoMap = () => {
    // kakao map 로드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat ?? DEFAULT_LAT,
          lng ?? DEFAULT_LNG
        ),
        level: zoom ?? DEFAULT_ZOOM,
      };
      //new kakao.maps.Map(node, options);
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      // map 객체를 상위(index.tsx)로 넘긴 다음 해당 map객체들을 가지고 Marker들을 구현

      setMap(map);
    });
  };
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
