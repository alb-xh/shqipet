import { useContext } from "react"

import { appContext } from "../app.context"

export const useRoom = () => {
  const { room, createRoom, joinRoom } = useContext(appContext)
  return { room, createRoom, joinRoom};
}
