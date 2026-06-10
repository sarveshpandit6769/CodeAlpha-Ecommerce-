import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/orderService";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totals, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) {
      setError("Enter a shipping address.");
      return;
    }

    try {
      setLoading(true);
      const orderPayload = {
        products: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: totals.totalPrice,
        shippingAddress: address,
      };
      const order = await placeOrder(orderPayload);
      clearCart();
      navigate(`/orders/${order._id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="page">
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <button className="button button-primary" type="button" onClick={() => navigate("/products")}>
            Shop products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page checkout-page">
      <div className="page-header">
        <h1>Checkout</h1>
        <p>Complete your order with shipping details.</p>
      </div>
      <section className="checkout-layout">
        <div className="checkout-form">
          <h2>Shipping address</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Address
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={5} required />
            </label>
            {error && <p className="error-message">{error}</p>}
            <button className="button button-primary" type="submit" disabled={loading}>
              {loading ? "Placing order..." : "Place order"}
            </button>
          </form>
        </div>
        <aside className="checkout-summary">
          <h2>Order summary</h2>
          <p>{totals.itemCount} items</p>
          <strong>${totals.totalPrice.toFixed(2)}</strong>
          <div className="checkout-products">
            {cartItems.map((item) => (
              <div key={item._id} className="checkout-product">
                <span>{item.name}</span>
                <span>{item.quantity} x ${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Checkout;
