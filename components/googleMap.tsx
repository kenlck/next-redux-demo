import { PropsWithChildren, useEffect, useRef } from 'react'

type Props = {
  center: google.maps.LatLngLiteral
  zoom: number
}
const GoogleMap: React.FC<PropsWithChildren<Props>> = ({ center, zoom, children }) => {
  const ref = useRef()

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    })

    const marker = new google.maps.Marker({
      position: center,
      map: map,
    })
  })

  return (
    <>
      <div ref={ref} id="map" className="h-full w-full"></div>
      {children}
    </>
  )
}

export default GoogleMap
