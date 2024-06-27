import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();

  const lat = searchParams.get("lat") || 51.505;
  const lng = searchParams.get("lng") || -0.09;

  return (
    <div className={styles.mapContainer} onClick={() => nav("form")}>
      <MapContainer
        className={styles.map}
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
