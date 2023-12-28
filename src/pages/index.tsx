import { useState, useEffect } from "react";

import Map from "@/components/Map";
import Markers from "@/components/Markers";

//import * as stores from "@/data/store_data.json";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";

export default function Home({ stores }: { stores: StoreType[] }) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  //const storeDatas = stores["DATA"];

  //console.log("currentStore", currentStore);
  return (
    <>
      {/* map 객체를 상위(index.tsx)로 넘긴 다음 해당 map객체들을 가지고 Marker들을 구현 */}
      <Map setMap={setMap} />
      <Markers stores={stores} map={map} setCurrentStore={setCurrentStore} />
      {/* 현재 클릭한 Store의 정보를 넘겨줄수 있고 x를 눌렀을 때 currentStore의 값을 null로 변경 가능*/}
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}

// API를 만든경우 fetch를 할 수 있다
export async function getStaticProps() {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((res) => res.json());

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
