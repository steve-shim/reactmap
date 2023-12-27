/*global kakao*/

// import Layout from "@/components/Layout";
// import Link from "next/link";
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Home() {
  const loadKakaoMap = () => {
    // kakao map 로드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      //new kakao.maps.Map(node, options);
      new kakao.maps.Map(mapContainer, mapOption);
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

// <h1 className="font-bold">Map Index Page</h1>
//       <ul className="px-4 py-2">
//         <li>
//           <Link href="/stores">맛집 목록</Link>
//         </li>
//         <li>
//           <Link href="/stores/new">맛집 생성</Link>
//         </li>
//         <li>
//           <Link href="/stores/1">맛집 상세 페이지</Link>
//         </li>
//         <li>
//           <Link href="/stores/1/edit">맛집 수정 페이지</Link>
//         </li>
//         <li>
//           <Link href="/users/login">로그인 페이지</Link>
//         </li>
//         <li>
//           <Link href="/users/mypage">마이 페이지</Link>
//         </li>
//         <li>
//           <Link href="/users/likes">찜한 맛집</Link>
//         </li>
//       </ul>
