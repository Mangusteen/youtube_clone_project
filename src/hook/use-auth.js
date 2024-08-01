import { useSelector } from "react-redux"

export function useAuth() {
  const { user: { email, token, userId } } = useSelector((state) => state.user);
  return {
    isAuth: !!email,
    email,
    token,
    userId
  }
}