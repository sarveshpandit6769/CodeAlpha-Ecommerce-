import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserOrders } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <main className="page orders-page">
      <div className="page-header">
        <h1>My Orders</h1>
        <p>Track your completed orders and open details.</p>
      </div>
      {loading ? (
        <p>Loading your orders...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <p>No orders found yet.</p>
          <Link to="/products" className="button button-primary">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div>
                <h2>Order #{order._id.slice(-6)}</h2>
                <p>Status: {order.status}</p>
              </div>
              <div>
                <p>Total: ${order.totalPrice.toFixed(2)}</p>
                <Link to={`/orders/${order._id}`} className="button button-outline">
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Orders;
