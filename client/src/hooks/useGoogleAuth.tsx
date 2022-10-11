import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const useGoogleAuth = () => {
  // get the context
  const context = useContext(AuthContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("ToastContext was used outside of its Provider");
  }

  return context;
}

export default useGoogleAuth