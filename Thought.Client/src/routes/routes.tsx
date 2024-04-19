import { useRoutes } from "react-router-dom";
import BaseRoutes from "./baseRoutes";

export default function Routes() {
  return useRoutes([BaseRoutes]);
}
