import { useAppContext } from "./use-app-context.hook";

export const useRoom = () => {
  const { room, createRoom, joinRoom } = useAppContext()
  return { room, createRoom, joinRoom};
}
