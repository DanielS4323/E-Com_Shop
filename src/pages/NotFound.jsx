import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h3>Page not found.</h3>
      <Link to="/dashboard">Return to Dashboard</Link>
    </div>
  );
};

export default NotFound;
