const fs = require('fs');

function processFile(path, replaceFn) {
    let content = fs.readFileSync(path, 'utf8');
    content = replaceFn(content);
    fs.writeFileSync(path, content);
    console.log('Fixed ' + path);
}

// 1. JobPage.jsx
processFile('components/JobPage.jsx', (c) => {
    c = c.replace('import { Search, MapPin, Briefcase, Clock, FileText, ChevronRight } from \"lucide-react\";', 'import { Search, MapPin, Briefcase, Clock, FileText, ChevronRight } from \"lucide-react\";\nimport { fetchJobs } from \"@/lib/api/jobs\";');
    c = c.replace(/const fetchUrl = `\$\{baseUrl\}\/api\/openings`;\s*const response = await fetch\(fetchUrl\);\s*if \(!response\.ok\) \{\s*throw new Error\(`Failed to fetch jobs: \$\{response\.statusText\}`\);\s*\}\s*const data = await response\.json\(\);/, 'const data = await fetchJobs();');
    return c;
});

// 2. JobDetailsPage.jsx
processFile('components/JobDetailsPage.jsx', (c) => {
    c = c.replace('import { MapPin, Briefcase, Clock, Share2, ArrowLeft, Upload, FileText, X } from \"lucide-react\";', 'import { MapPin, Briefcase, Clock, Share2, ArrowLeft, Upload, FileText, X } from \"lucide-react\";\nimport { fetchJobDetails } from \"@/lib/api/jobs\";');
    c = c.replace(/const response = await fetch\(\s*`\$\{baseUrl\}\/api\/openings\/\$\{jobId\}`\s*\);\s*if \(!response\.ok\) \{\s*throw new Error\(`Failed to fetch job details: \$\{response\.statusText\}`\);\s*\}\s*const data = await response\.json\(\);/, 'const data = await fetchJobDetails(jobId);');
    return c;
});

// 3. BlogPage.jsx
processFile('components/Blog/BlogPage.jsx', (c) => {
    c = c.replace('import { Calendar, User, Clock, Share2, ArrowLeft, ChevronRight } from \"lucide-react\";', 'import { Calendar, User, Clock, Share2, ArrowLeft, ChevronRight } from \"lucide-react\";\nimport { fetchBlogById, fetchLatestBlogs, fetchPreviousBlogs } from \"@/lib/api/blogs\";');
    c = c.replace(/const postResponse = await fetch\(`\$\{baseUrl\}\/api\/blogs\/\$\{id\}`\);\s*if \(!postResponse\.ok\) throw new Error\(`Failed to fetch main post\.`\);\s*const postData = await postResponse\.json\(\);/, 'const postData = await fetchBlogById(id);');
    c = c.replace(/const featuredResponse = await fetch\(`\$\{baseUrl\}\/api\/blogs\/latest`\);\s*if \(!featuredResponse\.ok\) \{\s*throw new Error\(`Failed to fetch featured posts\.`\);\s*\}\s*const featuredData = await featuredResponse\.json\(\);/, 'const featuredData = await fetchLatestBlogs();');
    c = c.replace(/const pastResponse = await fetch\(`\$\{baseUrl\}\/api\/blogs\/previous\/\$\{id\}`\);\s*if \(!pastResponse\.ok\) throw new Error\(`Failed to fetch past posts\.`\);\s*const pastData = await pastResponse\.json\(\);/, 'const pastData = await fetchPreviousBlogs(id);');
    return c;
});

// 4. AllBlogsPage.jsx
processFile('components/Blog/AllBlogsPage.jsx', (c) => {
    c = c.replace('import { Search, Calendar, User, ArrowRight, Tag } from \"lucide-react\";', 'import { Search, Calendar, User, ArrowRight, Tag } from \"lucide-react\";\nimport { fetchAllBlogs } from \"@/lib/api/blogs\";');
    c = c.replace(/const response = await fetch\(\s*`\$\{baseUrl\}\/api\/blogs`\s*\);\s*if \(!response\.ok\) \{\s*throw new Error\(`Failed to fetch blogs: \$\{response\.statusText\}`\);\s*\}\s*const data = await response\.json\(\);/, 'const data = await fetchAllBlogs();');
    return c;
});
