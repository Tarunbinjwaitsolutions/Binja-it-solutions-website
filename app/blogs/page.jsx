import AllBlogsPage from "@/components/Blog/AllBlogsPage";
import { fetchAllBlogs } from "@/lib/api/blogs";

export default async function Page() {
  let initialData = { data: [], pagination: { totalPages: 1 } };
  try {
    initialData = await fetchAllBlogs(1, 9, { next: { revalidate: 60 } });
  } catch (error) {
    console.error(error);
  }

  return <AllBlogsPage initialData={initialData} />;
}
