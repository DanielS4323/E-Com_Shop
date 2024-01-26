import { Col, Container, Row } from 'react-bootstrap';
import ProductsDash from '../components/product/ProductsDash';
import { getAllProducts, searchProducts } from '../api/products';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { LoadingSpinner, SearchBar } from '../components/UI';
import useDebounce from '../hooks/useDebounce';
import PageLayout from '../components/layout/PageLayout';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [debouncedSearch],
    queryFn: debouncedSearch ? searchProducts : getAllProducts,
    initialPageParam: 10,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalPages = lastPage.total;
      const currentNumberOfPages = lastPage.limit;

      return totalPages > currentNumberOfPages ? lastPageParam + 10 : undefined;
    },
  });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === 'pending') {
    return (
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
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  const noProducts = data.pages[data.pages.length - 1].products;



  
  return (
    <PageLayout>
      <Col>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Col>
      <Row>
        {data.pages[data.pages.length - 1].products.map((product, i) => {
          if (data.pages[data.pages.length - 1].products.length === i + 1) {
            return (
              <ProductsDash innerRef={ref} key={product.id} product={product} />
            );
          }
          return <ProductsDash key={product.id} product={product} />;
        })}
        {noProducts.length === 0 && <h3>No products.</h3>}
      </Row>
      <Row>
        {isFetchingNextPage && (
          <Row className="d-flex justify-content-center align-items-center">
            <LoadingSpinner
              variant="danger"
              animation="border"
              role="status"
              size="xxl"
            />
          </Row>
        )}
      </Row>
    </PageLayout>
  );
};

export default Dashboard;
