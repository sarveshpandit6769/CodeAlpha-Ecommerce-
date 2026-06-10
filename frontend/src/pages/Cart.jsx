import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, totals, updateQuantity, removeFromCart } = useCart();

  return (
    <main className="page cart-page">
      <div className="page-header">
        <h1>Your Cart</h1>
        <p>Review items before checkout.</p>
      </div>
      {cartItems.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link to="/products" className="button button-primary">
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-grid">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img src={item.image || "/placeholder.png"} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>
                    <div className="cart-quantity">
                      <button type="button" onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button className="button button-text" type="button" onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <aside className="cart-summary">
              <h2>Order summary</h2>
              <p>{totals.itemCount} items</p>
              <strong>${totals.totalPrice.toFixed(2)}</strong>
              <button className="button button-primary" type="button" onClick={() => navigate("/checkout")}>
                Checkout
              </button>
            </aside>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
