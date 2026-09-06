import { createContext, useContext, useState } from "react";

const ComplianceContext = createContext(null);

export function ComplianceProvider({ children }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  const clearScan = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return (
    <ComplianceContext.Provider
      value={{
        selectedImage,
        setSelectedImage,

        result,
        setResult,

        loading,
        setLoading,

        error,
        setError,

        clearResult,
        clearScan,
      }}
    >
      {children}
    </ComplianceContext.Provider>
  );
}

export function useCompliance() {
  const context = useContext(ComplianceContext);

  if (!context) {
    throw new Error(
      "useCompliance must be used inside ComplianceProvider"
    );
  }

  return context;
}