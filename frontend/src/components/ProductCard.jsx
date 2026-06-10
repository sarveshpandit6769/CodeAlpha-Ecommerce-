import { Link } from "react-router-dom";

const ProductCard = ({ product, onAdd }) => {
  return (
    <article className="product-card">
      <img src={product.image || "/placeholder.png"} alt={product.name} />
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <strong>${product.price.toFixed(2)}</strong>
        <div className="product-card-actions">
          <Link to={`/products/${product._id}`} className="button button-outline">
            View
          </Link>
          <button className="button" type="button" onClick={() => onAdd(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
