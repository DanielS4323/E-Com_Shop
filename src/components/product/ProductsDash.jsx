import { Button, Card, Col } from 'react-bootstrap';
import currencyFormat from '../../utilities/currencyFormat';
import { Link } from 'react-router-dom';
import { AddToCart } from '../UI';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartStore';
import { UserAuthCtx } from '../../store/AuthProvider';

const ProductsDash = ({ product, innerRef = undefined }) => {
  const { images, title, price, id } = product;
  const { authUser } = UserAuthCtx();
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(
      cartActions.addToCart({
        ...product,
      }),
    );
  };

  const addToFavoritesHandler = () => {
    if (authUser) {
      dispatch(cartActions.addToFavorites(product));
    }
  };

  return (
    <Col className="d-flex justify-content-center">
      <Card
        style={{ width: '15rem' }}
        className="align-items-center p-3 m-2"
        ref={innerRef}
      >
        <Button
          onClick={addToFavoritesHandler}
          size="sm"
          variant="outline-danger"
          className="ms-auto mb-3"
        >
          {' '}
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
        </Button>
        <Link to={`/product/${id}`}>
          <Card.Img
            variant="top"
            style={{ width: '10rem' }}
            src={
              product
                ? images[0]
                : 'https://placehold.co/600x400?text=Image+coming-soon'
            }
            alt="Product Image"
          />
        </Link>

        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-center">{title}</Card.Title>
          <Card.Text className="text-center">{currencyFormat(price)}</Card.Text>
          <AddToCart onClickHandler={addToCartHandler} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductsDash;
