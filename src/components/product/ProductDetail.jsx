import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../api/products';
import { Card, Carousel, Container, Image, Row } from 'react-bootstrap';
import currencyFormat from '../../utilities/currencyFormat';
import { AddToCart, LoadingSpinner } from '../UI';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartStore';
import PageLayout from '../layout/PageLayout';

const ProductDetail = () => {
  const { id } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getSingleProduct(id),
  });

  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(
      cartActions.addToCart({
        ...data,
      }),
    );
  };

  isPending && (
    <Container>
      <Row style={{ position: 'absolute', left: '50%', right: '50%' }}>
        <LoadingSpinner
          variant="primary"
          animation="border"
          role="status"
          size="xl"
        />
      </Row>
    </Container>
  );

  isError && <div>Error: {error.message}</div>;

  return (
    <PageLayout>
      <Card style={{ width: '50rem' }} className="align-items-center p-5 m-2">
        <Carousel controls>
          {data?.images?.map((image) => {
            return (
              <Carousel.Item key={image}>
                {<Image src={image} fluid style={{ width: '16rem' }} />}
              </Carousel.Item>
            );
          })}
        </Carousel>

        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-center">{data?.brand}</Card.Title>
          <Card.Title className="text-center">{data?.title}</Card.Title>
          <Card.Text className="text-center">{data?.description}</Card.Text>
          <Card.Text className="text-center">
            {currencyFormat(data?.price)}
          </Card.Text>

          <AddToCart onClickHandler={addToCartHandler} />
        </Card.Body>
      </Card>
    </PageLayout>
  );
};

export default ProductDetail;
