import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../utils/constants";

const cityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);
  const [currentCityId, setCurrentCityId] = useState(null);

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
      // setting the current city id for the active link
      setCurrentCityId(id);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      console.error("Error fetching city", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function setCity(data) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const ret = await response.json();

      setCurrentCityId(ret.id);
      setCities((c) => [...c, ret]);
      return false;
    } catch (error) {
      console.error("Error creating city", error);
      return error.message || "Error creating new city!";
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });

      setCities((c) => c.filter((city) => city.id !== id));
      setCurrentCityId((currId) => (currId === id ? "" : currId));

      return false;
    } catch (error) {
      console.log(error);
      return (
        `Couldn't delete city: ${error.message}` ||
        "Couldn't delete city. Try later!"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <cityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        setCurrentCity,
        getCity,
        setCity,
        deleteCity,
        currentCityId,
      }}
    >
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
