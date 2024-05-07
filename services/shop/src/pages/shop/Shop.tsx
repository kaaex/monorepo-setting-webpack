import { Link } from "react-router-dom";
import { shopRoutes } from "@packages/shared/src/routes/shop";

const Shop = () => {
  return (
    <h1>
      shop <br /> <Link to={shopRoutes.second}>go to second page</Link>
    </h1>
  );
};

export default Shop;
