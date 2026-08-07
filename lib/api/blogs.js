import { API_BASE_URL } from '../config/api';

export const fetchAllBlogs = async (page = 1, limit = 9) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/blogs?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch blogs: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching blogs:", error.message);
        throw error;
    }
};

export const fetchBlogById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch main post.`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching blog by id:", error.message);
        throw error;
    }
};

export const fetchLatestBlogs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/blogs/latest`);
        if (!response.ok) {
            throw new Error(`Failed to fetch featured posts.`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching latest blogs:", error.message);
        throw error;
    }
};

export const fetchPreviousBlogs = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/blogs/previous/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch past posts.`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching previous blogs:", error.message);
        throw error;
    }
};
