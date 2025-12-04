import { createContext, useContext, useState } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [options, setOptions] = useState(null);

  const confirm = (opts) => {
    return new Promise((resolve) => {
      setOptions({
        ...opts,
        resolve,
      });
    });
  };

  const onConfirm = () => {
    options.resolve(true);
    setOptions(null);
  };

  const onCancel = () => {
    options.resolve(false);
    setOptions(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {options && (
        <ConfirmDialog
          title={options.title}
          message={options.message}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}
