import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UserAuthCtx } from '../store/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { logIn, error, authUser } = UserAuthCtx();
  const navigate = useNavigate();
  
  if (authUser) {
    return navigate('/dashboard');
  }

  function onSubmitHandler(data) {
    const username = data.username;
    const password = data.password;

    logIn(username, password);
  }

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xl="4">
          <Form className="m-2" onSubmit={handleSubmit(onSubmitHandler)}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                {...register('username', {
                  required: 'This field is required.',
                })}
              />
              {errors.username && (
                <Form.Text className="text-danger">
                  {errors?.username?.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                {...register('password', {
                  required: 'This field is required.',
                })}
              />
              {errors.password && (
                <Form.Text className="text-danger">
                  {errors?.password?.message}
                </Form.Text>
              )}
              {error && (
                <Form.Text className="text-danger">{error?.message}</Form.Text>
              )}
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
