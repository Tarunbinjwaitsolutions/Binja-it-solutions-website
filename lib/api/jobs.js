import { API_BASE_URL } from '../config/api';

export const fetchJobs = async (page = 1, limit = 10, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/openings?page=${page}&limit=${limit}`, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch jobs: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Backend API unreachable. Error fetching jobs:", error.message);
        throw error;
    }
};

export const fetchJobDetails = async (id, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/openings/${id}`, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch job details: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching job details:", error.message);
        throw error;
    }
};

export const applyForJob = async (jobId, formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/applicants/${jobId}/apply`, {
            method: 'POST',
            body: formData, // Assuming FormData is passed for file uploads
        });
        if (!response.ok) {
            const errorResult = await response.json().catch(() => ({ message: "An unexpected error occurred." }));
            throw new Error(errorResult.message || `Failed to apply for job`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error applying for job:", error.message);
        throw error;
    }
};
