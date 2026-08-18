import JobPage from "@/components/JobPage";
import { fetchJobs } from "@/lib/api/jobs";

export default async function Page() {
  let initialJobs = [];
  try {
    initialJobs = await fetchJobs(1, 100, { next: { revalidate: 60 } });
  } catch (error) {
    console.error(error);
  }

  return <JobPage initialJobs={initialJobs} />;
}
