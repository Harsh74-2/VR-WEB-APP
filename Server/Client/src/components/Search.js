// components/Search.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Search() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/tours', {
        params: { query, location, category }
      });
      setResults(res.data);
    } catch (err) {
      setError('Failed to search tours. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search">
      <h2>Search Tours</h2>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search keywords" />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="search-results">
        {results.map(tour => (
          <div key={tour._id} className="search-result-item">
            <h3>{tour.title}</h3>
            <p>Location: {tour.location}</p>
            <p>Category: {tour.category}</p>
            <Link to={`/tour/${tour._id}`}>View Tour</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;