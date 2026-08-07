const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const fetchAllBlogs = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/blogs`);
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
        const response = await fetch(`${baseUrl}/api/blogs/${id}`);
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
        const response = await fetch(`${baseUrl}/api/blogs/latest`);
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
        const response = await fetch(`${baseUrl}/api/blogs/previous/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch past posts.`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching previous blogs:", error.message);
        throw error;
    }
};
