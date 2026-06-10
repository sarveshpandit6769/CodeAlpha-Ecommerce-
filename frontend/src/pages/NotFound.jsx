import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="page not-found-page">
    <div className="empty-state">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/" className="button button-primary">
        Go home
      </Link>
    </div>
  </main>
);

export default NotFound;
