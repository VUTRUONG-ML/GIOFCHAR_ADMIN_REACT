import { createContext, useContext, useState } from "react";
import LoaderActiveBtn from "../components/LoaderActiveBtn";

const LoaderContext = createContext(null);

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ setLoading }}>
      {children}
      {loading && <LoaderActiveBtn />}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
