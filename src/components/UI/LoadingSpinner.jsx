import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner(args) {
  return (
    <Spinner {...args}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default LoadingSpinner;
