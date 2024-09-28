// userController.js

// Import necessary modules and services
import { api } from './api';
import { asyncErrorHandler, handleAPIResponse } from './errorHandler';

// User controller object containing user-related operations
const userController = {
  // Fetch user profile information
  getUserProfile: asyncErrorHandler(async (userId) => {
    const response = await fetch(`${api.BASE_URL}/users/${userId}`);
    return handleAPIResponse(response);
  }),

  // Update user profile information
  updateUserProfile: asyncErrorHandler(async (userId, profileData) => {
    const response = await fetch(`${api.BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    return handleAPIResponse(response);
  }),

  // Get user's VR experience history
  getVRHistory: asyncErrorHandler(async (userId) => {
    const response = await fetch(`${api.BASE_URL}/users/${userId}/vr-history`);
    return handleAPIResponse(response);
  }),

  // Save a new VR experience to user's history
  saveVRExperience: asyncErrorHandler(async (userId, experienceData) => {
    const response = await fetch(`${api.BASE_URL}/users/${userId}/vr-history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(experienceData),
    });
    return handleAPIResponse(response);
  }),

  // Get user's VR preferences
  getVRPreferences: asyncErrorHandler(async (userId) => {
    const response = await fetch(`${api.BASE_URL}/users/${userId}/vr-preferences`);
    return handleAPIResponse(response);
  }),

  // Update user's VR preferences
  updateVRPreferences: asyncErrorHandler(async (userId, preferences) => {
    const response = await fetch(`${api.BASE_URL}/users/${userId}/vr-preferences`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences),
    });
    return handleAPIResponse(response);
  }),

  // Get user's friends list
  getFriends: asyncErrorHandler(async (userId) => {
    const response = await fetch(`${api.BASE_URL}/users/${userId}/friends`);
    return handleAPIResponse(response);
  }),

  // Add a new friend to user's friend list
  addFriend: asyncErrorHandler(async (userId, friendId) => {
    const response = await fetch(`${api.BASE_URL}/users/${userId}/friends`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ friendId }),
    });
    return handleAPIResponse(response);
  }),

  // Remove a friend from user's friend list
  removeFriend: asyncErrorHandler(async (userId, friendId) => {
    const response = await fetch(`${api.BASE_URL}/users/${userId}/friends/${friendId}`, {
      method: 'DELETE',
    });
    return handleAPIResponse(response);
  }),
};

export default userController;