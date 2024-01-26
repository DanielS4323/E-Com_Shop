import PageLayout from '../components/layout/PageLayout';
import { Button, Stack, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import currencyFormat from '../utilities/currencyFormat';
import { cartActions } from '../store/cartStore';
// import { UserAuthCtx } from '../store/AuthProvider';
// import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { favorites } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const { authUser } = UserAuthCtx();
  // const navigate = useNavigate();
  // if (!authUser) {
  //   navigate('/dashboard');
  // }
  return (
    <PageLayout>
      <Col xl="8">
        {favorites.map((item) => {
          return (
            <Stack direction="horizontal" gap={4} key={item.id}>
              <div className="p-2">{item.title}</div>
              <div className="vr" />
              <div className="p-2">{currencyFormat(item.price)}</div>
              <div className="p-2 ms-auto">
                <div className="vr" />
                <Button
                  onClick={() => dispatch(cartActions.removeFavorite(item.id))}
                  variant="danger"
                >
                  -
                </Button>
              </div>
              <div className="vr" />
            </Stack>
          );
        })}
        {favorites.length === 0 && <p>No items</p>}
      </Col>
    </PageLayout>
  );
};

export default Favorites;
