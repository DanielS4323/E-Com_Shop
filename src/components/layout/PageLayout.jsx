import { Container, Row } from 'react-bootstrap';

const PageLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row className="d-flex justify-content-center m-5">{children}</Row>
    </Container>
  );
};

export default PageLayout;
