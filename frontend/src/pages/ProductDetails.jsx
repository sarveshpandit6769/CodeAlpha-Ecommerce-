import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../services/productService";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <main className="page"><p>Loading product...</p></main>;
  if (error) return <main className="page"><p className="error-message">{error}</p></main>;
  if (!product) return <main className="page"><p>Product not found.</p></main>;

  return (
    <main className="page product-details-page">
      <button className="button button-outline" type="button" onClick={() => navigate(-1)}>
        Back to products
      </button>
      <section className="product-details-card">
        <img src={product.image || "/placeholder.png"} alt={product.name} />
        <div>
          <h1>{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <strong className="product-price">${product.price.toFixed(2)}</strong>
          <p>{product.description}</p>
          <div className="product-details-actions">
            <button className="button button-primary" type="button" onClick={() => addToCart(product)}>
              Add to cart
            </button>
            <button className="button button-outline" type="button" onClick={() => navigate("/cart")}>
              Go to cart
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
