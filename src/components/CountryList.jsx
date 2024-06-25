import PropTypes from "prop-types";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList({ isLoading, cities }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first visited city by clicking on the map!"}
      />
    );

  // optimized way of extracting unique countries from the cities array
  const countries = cities.reduce((acc, city) => {
    if (!acc.find((country) => country.country === city.country)) {
      acc.push({ country: city.country, emoji: city.emoji });
    }
    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  cities: PropTypes.array.isRequired,
};

export default CountryList;
