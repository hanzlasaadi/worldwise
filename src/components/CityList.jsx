import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";

function CityList() {
  const { cities, isLoading, currentCityId } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first visited city by clicking on the map!"}
      />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} currentCityId={currentCityId} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
