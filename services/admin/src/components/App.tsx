import { Outlet } from "react-router-dom";
import { deepMerge } from "@packages/shared/src/utils/deepMerge";

export const App = () => {
  return (
    <div>
      <h1>Admin module</h1>
      <Outlet />
    </div>
  );
};
