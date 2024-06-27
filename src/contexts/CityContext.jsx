import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../utils/constants";

const cityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.log(error);
        alert("There was an error loading data!");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      console.error("Error fetching city", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <cityContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </cityContext.Provider>
  );
}

CityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useCities() {
  const context = useContext(cityContext);

  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }

  return context;
}

export { CityProvider, useCities };
