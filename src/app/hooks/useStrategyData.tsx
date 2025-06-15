import { useContext } from "react"
import { StrategyContext } from "../context/strategy-provider";

const useStrategyData = () => {
  const context = useContext(StrategyContext);

  return (
    context
  )
}

export default useStrategyData;