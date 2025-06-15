'use client';

import { createContext, useState } from 'react';

type StrategyBlockType = {
  text: string;
  snapshot: number;
}

type AiStrategyContextType = {
  suggestions: StrategyBlockType[];
  anomalies: StrategyBlockType[];
  addSuggestion: (val: StrategyBlockType) => void;
  addAnomaly: (val: StrategyBlockType) => void;
};

export const AiStrategyContext = createContext<AiStrategyContextType>({
  suggestions: [],
  anomalies: [],
  addSuggestion: () => {},
  addAnomaly: () => {},
});

export default function AiStrategyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [suggestions, setSuggestions] = useState<StrategyBlockType[]>([]);
  const [anomalies, setAnomalies] = useState<StrategyBlockType[]>([]);

  const addSuggestion = (suggestion: StrategyBlockType) => {
    setSuggestions((val) => [...val, suggestion]);
  };

  const addAnomaly = (anomaly: StrategyBlockType) => {
    setAnomalies((val) => [...val, anomaly]);
  };

  return (
    <AiStrategyContext.Provider
      value={{
        suggestions,
        anomalies,
        addSuggestion,
        addAnomaly,
      }}
    >
      {children}
    </AiStrategyContext.Provider>
  );
}
