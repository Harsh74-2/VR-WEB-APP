// components/TourViewer.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'aframe';                      // registers the a-scene/a-sky/etc custom elements
import { Scene, Entity } from 'aframe-react';
import AgentChat from './AgentChat';

function TourViewer() {
  const { id } = useParams();   // react-router v6 removed props.match
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sceneRef = useRef(null);
  const [camPos, setCamPos] = useState(null);   // camera teleport target from the AI guide

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const tourRes = await axios.get(`/api/tours/${id}`);
        setTour(tourRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tour data');
        setLoading(false);
      }
    };
    fetchTourData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!tour) return <div>Tour not found</div>;

  return (
    <div className="tour-viewer">
      <h2>{tour.title}</h2>
      <div className="vr-content" style={{ height: '500px', width: '100%' }}>
        <Scene ref={sceneRef}>
          <Entity primitive="a-sky" src={tour.panoramaUrl} rotation="0 -130 0"/>
          <Entity primitive="a-camera" look-controls position={camPos || undefined}>
            <Entity primitive="a-cursor" animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"/>
          </Entity>
          {(tour.hotspots || []).map((hotspot, index) => (
            <Entity
              key={index}
              primitive="a-sphere"
              radius="0.2"
              position={hotspot.position}
              color="#00FF00"
              events={{
                click: () => alert(hotspot.description)
              }}
            />
          ))}
        </Scene>
      </div>
      <AgentChat
        tourId={tour._id || id}
        hotspots={tour.hotspots || []}
        onGoto={setCamPos}
      />
      <div className="tour-metadata">
        <p>Location: {tour.location}</p>
        <p>Category: {tour.category}</p>
        <p>Tags: {(tour.tags || []).join(', ')}</p>
        <p>Description: {tour.description}</p>
      </div>
    </div>
  );
}

export default TourViewer;