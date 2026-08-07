import BlogPage from "@/components/Blog/BlogPage";
import { fetchBlogById, fetchLatestBlogs, fetchPreviousBlogs } from "@/lib/api/blogs";

export default async function Page({ params }) {
  const { id } = await params;
  let initialData = { post: null, featuredPosts: [], pastPosts: [], error: null };

  try {
    const postResult = await fetchBlogById(id, { next: { revalidate: 60 } });
    initialData.post = postResult.data;

    const featuredResult = await fetchLatestBlogs({ next: { revalidate: 60 } });
    const featuredData = featuredResult.data || [];
    initialData.featuredPosts = featuredData.filter((p) => p._id !== id);

    const pastResult = await fetchPreviousBlogs(id, { next: { revalidate: 60 } });
    initialData.pastPosts = pastResult.data || [];
  } catch (err) {
    console.error(err);
    initialData.error = "Failed to load blog post. Please try again later.";
  }

  return <BlogPage initialData={initialData} />;
}
