import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totals } = useCart();

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">CodeAlpha Store</Link>
      </div>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart ({totals.itemCount})</NavLink>
        {user ? (
          <>
            <NavLink to="/orders">Orders</NavLink>
            <button type="button" className="nav-logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
