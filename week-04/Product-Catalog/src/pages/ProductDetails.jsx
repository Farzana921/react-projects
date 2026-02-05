import { Link, useNavigate, useParams } from "react-router";
import { products } from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div>
        <h2>Product not found</h2>
        <p>We couldn’t find a product with id: <b>{id}</b></p>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p><b>Price:</b> ${product.price}</p>
      <p><b>Category:</b> {product.category}</p>
      <p><b>Description:</b> {product.description}</p>

      <button onClick={() => navigate(-1)} style={{ marginTop: 12 }}>
        Back to Products
      </button>
    </div>
  );
}
