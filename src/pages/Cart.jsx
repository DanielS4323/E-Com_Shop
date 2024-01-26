import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cartStore';
import currencyFormat from '../utilities/currencyFormat';
import { UserAuthCtx } from '../store/AuthProvider';
import postCart from '../api/addCart';

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const { authUser } = UserAuthCtx();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      address: '',
      phone: '',
    },
  });

  const onSubmitHandler = () => {
    const cartToPost = cart.map(({ id, quantity }) => ({ id, quantity }));
    postCart(cartToPost);
  };
  return (
    <Container fluid>
      <Row className="d-flex justify-content-center m-5">
        <Col xl="8">
          {cart.map((item) => {
            return (
              <Stack direction="horizontal" gap={4} key={item.id}>
                <div className="p-2">{item.title}</div>
                <div className="vr" />
                <div className="p-2">
                  {currencyFormat(item.quantity * item.price)}
                </div>
                <div className="p-2 ms-auto">
                  <Button
                    onClick={() => dispatch(cartActions.addToCart(item))}
                    variant="primary"
                  >
                    +
                  </Button>
                  <div className="vr" />
                  <Button
                    onClick={() =>
                      dispatch(cartActions.removeFromCart(item.id))
                    }
                    variant="danger"
                  >
                    -
                  </Button>
                </div>
                <div className="vr" />
                <Badge bg="primary" pill>
                  {item.quantity}
                </Badge>
              </Stack>
            );
          })}
          {cart.length === 0 && <p>No items</p>}
        </Col>
      </Row>
      {!authUser && cart.length !== 0 && <p>Please log in to proceed...</p>}
      {authUser && cart.length !== 0 && (
        <Row className="d-flex justify-content-center m-5">
          <Col xs={6}>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  {...register('address', {
                    required: 'This field is required.',
                  })}
                />
                {errors.address && (
                  <Form.Text className="text-danger">
                    {errors?.address?.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="+381234567890"
                  {...register('phone', {
                    required: 'This field is required.',
                    pattern: {
                      value: /^\+\d{3}\d{9}$/,
                      message: 'Invalid phone number format',
                    },
                  })}
                />
                {errors.phone && (
                  <Form.Text className="text-danger">
                    {errors?.phone?.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="msg">
                <Form.Label>Your Message</Form.Label>
                <Form.Control as="textarea" rows={2} />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;
