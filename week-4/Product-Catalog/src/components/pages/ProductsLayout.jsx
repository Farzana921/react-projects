import { Outlet } from "react-router";

export default function ProductsLayout() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Products</h1>
      <p>Browse our catalog. (Filter area placeholder)</p>

      <hr style={{ margin: "16px 0" }} />

      <Outlet />
    </div>
  );
}
