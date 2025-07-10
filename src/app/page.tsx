'use client';
import { useEffect, useRef } from 'react';
import Image from "next/image";

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.naver && mapRef.current) {
      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(37.5665, 126.9780), // 기본값: 서울시청
        zoom: 10,
      });

      // 내 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const userLocation = new window.naver.maps.LatLng(userLat, userLng);
            map.setCenter(userLocation); // 내 위치로 지도 중심 이동

            // 내 위치에 마커 추가
            new window.naver.maps.Marker({
              position: userLocation,
              map: map,
              title: "내 위치"
            });
          },
          (error) => {
            console.error("위치 정보를 가져올 수 없습니다.", error);
          }
        );
      }
    }
  }, []);

  return (
    <div>
      <h1>화장실 지도 프로젝트</h1>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}
