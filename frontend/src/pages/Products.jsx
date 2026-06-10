import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="page products-page">
      <div className="page-header">
        <h1>Products</h1>
        <p>Choose from the catalog and add items to your cart.</p>
      </div>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onAdd={addToCart} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Products;
