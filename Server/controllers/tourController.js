// tourController.js

// Import necessary modules and services
import { api } from './api';
import { asyncErrorHandler, handleAPIResponse } from './errorHandler';

// Tour controller object containing VR tour-related operations
const tourController = {
  // Fetch all available VR tours
  getAllTours: asyncErrorHandler(async () => {
    const response = await fetch(`${api.BASE_URL}/tours`);
    return handleAPIResponse(response);
  }),

  // Get details of a specific VR tour
  getTourDetails: asyncErrorHandler(async (tourId) => {
    const response = await fetch(`${api.BASE_URL}/tours/${tourId}`);
    return handleAPIResponse(response);
  }),

  // Start a VR tour for a user
  startTour: asyncErrorHandler(async (userId, tourId) => {
    const response = await fetch(`${api.BASE_URL}/tours/${tourId}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    return handleAPIResponse(response);
  }),

  // End a VR tour for a user
  endTour: asyncErrorHandler(async (userId, tourId) => {
    const response = await fetch(`${api.BASE_URL}/tours/${tourId}/end`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    return handleAPIResponse(response);
  }),

  // Get user's progress in a specific tour
  getTourProgress: asyncErrorHandler(async (userId, tourId) => {
    const response = await fetch(`${api.BASE_URL}/tours/${tourId}/progress/${userId}`);
    return handleAPIResponse(response);
  }),

  // Save user's progress in a tour
  saveTourProgress: asyncErrorHandler(async (userId, tourId, progressData) => {
    const response = await fetch(`${api.BASE_URL}/tours/${tourId}/progress/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progressData),
    });
    return handleAPIResponse(response);
  }),

  // Get all points of interest for a specific tour
  getTourPOIs: asyncErrorHandler(async (tourId) => {
    const response = await fetch(`${api.BASE_URL}/tours/${tourId}/pois`);
    return handleAPIResponse(response);
  }),

  // Get details of a specific point of interest
  getPOIDetails: asyncErrorHandler(async (tourId, poiId) => {
    const response = await fetch(`${api.BASE_URL}/tours/${tourId}/pois/${poiId}`);
    return handleAPIResponse(response);
  }),

  // Rate a tour
  rateTour: asyncErrorHandler(async (userId, tourId, rating) => {
    const response = await fetch(`${api.BASE_URL}/tours/${tourId}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, rating }),
    });
    return handleAPIResponse(response);
  }),

  // Get tour recommendations for a user
  getTourRecommendations: asyncErrorHandler(async (userId) => {
    const response = await fetch(`${api.BASE_URL}/tours/recommendations/${userId}`);
    return handleAPIResponse(response);
  }),
};

export default tourController;