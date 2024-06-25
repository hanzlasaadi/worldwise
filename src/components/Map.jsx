import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => nav("form")}>
      <h1>Map</h1>
      <h1>
        Position: {searchParams.get("lat")} {searchParams.get("lng")}
      </h1>
      <button onClick={() => setSearchParams({ lat: 50, lng: 80 })}>
        Click me
      </button>
    </div>
  );
}

export default Map;
