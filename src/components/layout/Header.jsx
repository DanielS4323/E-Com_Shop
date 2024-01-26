import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserAuthCtx } from '../../store/AuthProvider';
import { useSelector } from 'react-redux';

const Header = () => {
  const { authUser } = UserAuthCtx();
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <Navbar expand="lg" bg="info" className="mb-5">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
            {authUser && (
              <Link className="nav-link" to="/favorites">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                  />
                </svg>
              </Link>
            )}
            {!authUser && (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}
            <Link className="nav-link" to="/cart">
              <p>
                <span className="m-1">Cart</span>
                {totalItems > 0 && (
                  <Badge pill bg="danger">
                    {totalItems}
                  </Badge>
                )}
              </p>
            </Link>
            {authUser && (
              <Navbar.Brand>
                <img
                  src={authUser.image}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
