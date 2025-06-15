import { useContext } from "react"
import { SnapshotContext } from "../panel/snapshot-provider"

const useSnapshotData = () => {
  const context = useContext(SnapshotContext);

  return (
    context
  )
}

export default useSnapshotData;