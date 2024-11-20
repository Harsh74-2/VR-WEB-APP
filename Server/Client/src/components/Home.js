// components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get('/api/tours');
        setTours(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tours');
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home">
      <h1>Welcome to Virtual Tours</h1>
      <div className="tour-list">
        {tours.map(tour => (
          <div key={tour._id} className="tour-item">
            <h3>{tour.title}</h3>
            <p>Location: {tour.location}</p>
            <Link to={`/tour/${tour._id}`}>View Tour</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;