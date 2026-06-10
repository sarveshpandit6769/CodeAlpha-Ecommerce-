import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrder } from "../services/orderService";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrder(id);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <main className="page"><p>Loading order...</p></main>;
  if (error) return <main className="page"><p className="error-message">{error}</p></main>;
  if (!order) return <main className="page"><p>Order not found.</p></main>;

  return (
    <main className="page order-details-page">
      <div className="page-header">
        <h1>Order #{order._id.slice(-6)}</h1>
        <p>Status: {order.status}</p>
      </div>
      <section className="order-details-card">
        <div className="order-info">
          <h2>Shipping address</h2>
          <p>{order.shippingAddress}</p>
          <h2>Products</h2>
          <ul>
            {order.products.map((item) => (
              <li key={item.productId || item.name}>
                {item.name} x {item.quantity} — ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-summary">
          <h2>Order total</h2>
          <strong>${order.totalPrice.toFixed(2)}</strong>
          <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          <Link to="/orders" className="button button-outline">
            Back to orders
          </Link>
        </div>
      </section>
    </main>
  );
};

export default OrderDetails;
