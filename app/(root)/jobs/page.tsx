import QuestionCard from "@/components/card/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filters";


export default async function Home() {
//   const { userId } = auth();
//   if (!userId) return null;
//   const result = await getSavedQuestions({
//     clerkId: userId,
//     searchQuery: searchParams.q,
//     filter: searchParams.filter,
//     page:searchParams.page ? +searchParams.page:1
//   });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="mt-11 flex justify-between max-sm:flex-col sm:items-center gap-5">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search For Jobs"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="max-md:flex"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        <NoResult
          title="There is no Jobs to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
          link="/jobs"
          linkTitle="Post a job"
        />
      </div>
      <div className="mt-10 ">
        {/* <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result!.isNext}
        /> */}
      </div>
    </>
  );
}
