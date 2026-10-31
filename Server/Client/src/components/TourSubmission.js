// components/TourSubmission.js
import React, { useState } from 'react';
import axios from 'axios';

function TourSubmission() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [panoramaFile, setPanoramaFile] = useState(null);
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('panoramaFile', panoramaFile);
    formData.append('hotspots', JSON.stringify(hotspots));

    try {
      await axios.post('/api/tours', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Tour submitted successfully!');
      // Reset form
    } catch (err) {
      setError('Failed to submit tour. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addHotspot = () => {
    setHotspots([...hotspots, { position: '', description: '' }]);
  };

  const updateHotspot = (index, field, value) => {
    const updatedHotspots = [...hotspots];
    updatedHotspots[index][field] = value;
    setHotspots(updatedHotspots);
  };

  return (
    <form onSubmit={handleSubmit} className="tour-submission-form">
      <h2>Submit a New VR Tour</h2>
      {error && <div className="error">{error}</div>}
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tour Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tour Description" required />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma-separated)" />
      <input type="file" onChange={(e) => setPanoramaFile(e.target.files[0])} accept="image/*" required />
      
      <h3>Hotspots</h3>
      {hotspots.map((hotspot, index) => (
        <div key={index}>
          <input 
            type="text" 
            value={hotspot.position} 
            onChange={(e) => updateHotspot(index, 'position', e.target.value)} 
            placeholder="Position (x y z)" 
          />
          <input 
            type="text" 
            value={hotspot.description} 
            onChange={(e) => updateHotspot(index, 'description', e.target.value)} 
            placeholder="Description" 
          />
        </div>
      ))}
      <button type="button" onClick={addHotspot}>Add Hotspot</button>

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Tour'}
      </button>
    </form>
  );
}

export default TourSubmission;