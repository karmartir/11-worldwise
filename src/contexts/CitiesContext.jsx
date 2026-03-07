import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import citiesLocal from "../../data/citiesLocal.json";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function init() {
  try {
    const storedCities = localStorage.getItem("cities");

    return {
      ...initialState,
      cities: storedCities ? JSON.parse(storedCities) : citiesLocal,
    };
  } catch {
    return { ...initialState, cities: citiesLocal };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };

    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((c) => c.id !== action.payload),
        currentCity: {},
        isLoading: false,
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const { cities, isLoading, currentCity, error } = state;

  // persist cities
  useEffect(() => {
    try {
      localStorage.setItem("cities", JSON.stringify(cities));
    } catch {
      // ignore storage errors
    }
  }, [cities]);

  const getCity = useCallback(
    function getCity(id) {
      const numericId = Number(id);
      if (currentCity.id === numericId) return;

      dispatch({ type: "loading" });

      try {
        const city = cities.find((c) => c.id === numericId);

        if (!city) throw new Error("City not found");

        dispatch({
          type: "city/loaded",
          payload: city,
        });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: `There was an error loading city... ${err}`,
        });
      }
    },
    [cities, currentCity.id],
  );

  const createCity = useCallback(function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const cityWithId = {
        ...newCity,
        id: Date.now(),
      };

      dispatch({
        type: "city/created",
        payload: cityWithId,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: `There was an error creating city... ${err}`,
      });
    }
  }, []);

  const deleteCity = useCallback(function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: `There was an error deleting city... ${err}`,
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      cities,
      isLoading,
      currentCity,
      error,
      getCity,
      createCity,
      deleteCity,
    }),
    [cities, isLoading, currentCity, error, getCity, createCity, deleteCity],
  );

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
