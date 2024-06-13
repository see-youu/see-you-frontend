import { useEffect, useRef, useState } from "react";

const NaverMap = () => {
  const mapElement = useRef(null);

  // 비동기적으로 화면이 로드될 때 네이버 맵스 스크립트가 로드되는지 확인하고 로드가 되면 지도를 그리기 위해 필요한 로직!
  const [naverMapsLoaded, setNaverMapsLoaded] = useState(false);
  useEffect(() => {
    if (window.naver && window.naver.maps) {
      setNaverMapsLoaded(true);
    } else {
      const intervalId = setInterval(() => {
        if (window.naver && window.naver.maps) {
          setNaverMapsLoaded(true);
          clearInterval(intervalId);
        }
      }, 100); // 100ms마다 체크

      // 클린업 함수
      return () => clearInterval(intervalId);
    }
  }, []);

  //naverMapsLoaded가 true로 바뀌면 지도 그리기!
  useEffect(() => {
    // 지도 초기화
    if (mapElement.current && naverMapsLoaded) {
      const { naver } = window;
      const location = new naver.maps.LatLng(37.3595704, 127.105399);
      const mapOptions = {
        center: location,
        zoom: 16,
        zoomControl: false,
      };
      const map = new naver.maps.Map(mapElement.current, mapOptions);
      new naver.maps.Marker({
        position: location,
        map: map,
      });
    }
  }, [naverMapsLoaded]); // naverMapsLoaded가 변경될 때만 실행

  return <div ref={mapElement} className="w-96 h-96"></div>;
};

export default NaverMap;