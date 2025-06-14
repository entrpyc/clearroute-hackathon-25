'use client';

import { createContext, useEffect, useState } from 'react';

type StrategyBlockType = {
  text: string;
  snapshot: number;
}

type StrategyContextType = {
  suggestions: StrategyBlockType[];
  anomalies: StrategyBlockType[];
  addSuggestions: (val: StrategyBlockType[]) => void;
  addAnomalies: (val: StrategyBlockType[]) => void;
};

export const StrategyContext = createContext<StrategyContextType>({
  suggestions: [],
  anomalies: [],
  addSuggestions: () => {},
  addAnomalies: () => {},
});

export default function StrategyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [suggestions, setSuggestions] = useState<StrategyBlockType[]>([]);
  const [anomalies, setAnomalies] = useState<StrategyBlockType[]>([]);

  const addSuggestions = (strategy: StrategyBlockType[]) => {
    console.log(strategy)
    setSuggestions((val) => [...val, ...strategy]);
  };

  const addAnomalies = (strategy: StrategyBlockType[]) => {
    setAnomalies((val) => [...val, ...strategy]);
  };

  useEffect(() => {
    console.log(suggestions)
  }, [suggestions])

  return (
    <StrategyContext.Provider
      value={{
        suggestions,
        anomalies,
        addSuggestions,
        addAnomalies,
      }}
    >
      {children}
    </StrategyContext.Provider>
  );
}
