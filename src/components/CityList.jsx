import PropTypes from "prop-types";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList({ isLoading, cities }) {
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
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  cities: PropTypes.array.isRequired,
};

export default CityList;
