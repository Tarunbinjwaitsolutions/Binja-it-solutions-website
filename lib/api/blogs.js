import { API_BASE_URL } from '../config/api';
import toast from 'react-hot-toast';

export const fetchAllBlogs = async (page = 1, limit = 9, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/blogs?page=${page}&limit=${limit}`, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch blogs: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching blogs:", error.message);
        toast.error("Failed to load blog posts. Please check your connection.");
        throw error;
    }
};

export const fetchBlogById = async (id, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch main post.`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching blog by id:", error.message);
        toast.error("Could not load this blog post. It might have been removed.");
        throw error;
    }
};

export const fetchLatestBlogs = async (options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/blogs/latest`, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch featured posts.`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching latest blogs:", error.message);
        toast.error("Failed to load the latest blog posts.");
        throw error;
    }
};

export const fetchPreviousBlogs = async (id, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/blogs/previous/${id}`, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch past posts.`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching previous blogs:", error.message);
        toast.error("Failed to load older blog posts.");
        throw error;
    }
};
