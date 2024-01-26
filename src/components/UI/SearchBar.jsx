import { Form } from 'react-bootstrap';

const SearchBar = ({ setSearchQuery, searchQuery }) => {
  return (
    <Form>
      <Form.Control
        value={searchQuery}
        type="search"
        placeholder="&#x1F50D; Search..."
        className=""
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Form>
  );
};

export default SearchBar;
