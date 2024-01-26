import { Button } from 'react-bootstrap';

const AddToCart = ({ onClickHandler }) => {
  return (
    <Button
      variant="primary"
      className="mt-auto align-self-center"
      onClick={onClickHandler}
    >
      Add to cart
    </Button>
  );
};

export default AddToCart;
