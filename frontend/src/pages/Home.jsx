import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Home = () => {
  const { totals } = useCart();

  return (
    <main className="page home-page">
      <section className="hero-section">
        <div>
          <p className="eyebrow">CodeAlpha Ecommerce</p>
          <h1>Build Your Own Online Store</h1>
          <p>
            Shop from a growing catalog, add products to cart, place orders, and
            view your purchases.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="button button-primary">
              Browse products
            </Link>
            <Link to="/cart" className="button button-outline">
              View cart ({totals.itemCount})
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-box">
            <h2>Fast checkout</h2>
            <p>Secure order processing with React + Node + MongoDB.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
