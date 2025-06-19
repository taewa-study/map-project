'use client';
import { useEffect, useRef } from 'react';
import Image from "next/image";

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.naver && mapRef.current) {
      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표
        zoom: 10,
      });
    }
  }, []);

  return (
    <div>
      <h1>화장실 지도 프로젝트</h1>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
}
