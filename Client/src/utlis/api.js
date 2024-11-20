// api.js

// Use the environment variable for the base URL
const BASE_URL = process.env.REACT_APP_API_URL

// Object containing all API methods
export const api = {
  // Fetch available VR experiences
  getExperiences: async () => {
    try {
      const response = await fetch(`${BASE_URL}/experiences`);
      if (!response.ok) throw new Error('Failed to fetch experiences');
      return await response.json();
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  },

  // Get details of a specific VR experience
  getExperienceDetails: async (experienceId) => {
    try {
      const response = await fetch(`${BASE_URL}/experiences/${experienceId}`);
      if (!response.ok) throw new Error('Failed to fetch experience details');
      return await response.json();
    } catch (error) {
      console.error('Error fetching experience details:', error);
      throw error;
    }
  },

  // Save user progress in a VR experience
  saveProgress: async (userId, experienceId, progressData) => {
    try {
      const response = await fetch(`${BASE_URL}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, experienceId, progressData }),
      });
      if (!response.ok) throw new Error('Failed to save progress');
      return await response.json();
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  },

  // Get user settings
  getUserSettings: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/settings`);
      if (!response.ok) throw new Error('Failed to fetch user settings');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user settings:', error);
      throw error;
    }
  },

  // Update user settings
  updateUserSettings: async (userId, settings) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      if (!response.ok) throw new Error('Failed to update user settings');
      return await response.json();
    } catch (error) {
      console.error('Error updating user settings:', error);
      throw error;
    }
  },
};