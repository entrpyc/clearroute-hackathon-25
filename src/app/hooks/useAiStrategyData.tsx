import { useContext } from "react"
import { AiStrategyContext } from "../context/aiStrategy-provider";

const useAiStrategyData = () => {
  const context = useContext(AiStrategyContext);

  return (
    context
  )
}

export default useAiStrategyData;