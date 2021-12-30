import { useLocation } from "react-router-dom";

export function useQuery(target: string) {
  let Query = new URLSearchParams(useLocation().search);
  return Query.get(target) || '';
};