import { useLocation } from "react-router-dom";

function useRoute() {
  let location = useLocation();
  return {
    location,
  };
}

export default useRoute;
