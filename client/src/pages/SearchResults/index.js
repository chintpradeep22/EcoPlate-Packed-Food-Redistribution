import FoodDisplay from '../../components/FoodDisplay';
import './SearchResults.css';

const SearchResults = () => {

  return (
    <div className="search-results">
      <h2>Search Results: </h2>
      <FoodDisplay />
    </div>
  );
};

export default SearchResults;
