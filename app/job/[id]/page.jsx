import JobDetailsPage from "@/components/JobDetailsPage";
import { fetchJobDetails } from "@/lib/api/jobs";

export default async function Page({ params }) {
  const { id } = await params;
  let initialJob = null;
  let error = null;

  try {
    initialJob = await fetchJobDetails(id, { next: { revalidate: 60 } });
  } catch (err) {
    console.error(err);
    error = "Failed to load job details. Please try again later.";
  }

  return <JobDetailsPage initialJob={initialJob} initialError={error} />;
}
