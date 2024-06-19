import QuestionCard from "@/components/card/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { HomePageFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";


export  default async function Home() {
  const {userId} = auth()
  if(!userId) return null
  const result = await getSavedQuestions({clerkId:userId})

  return (
    <>
        <h1 className="h1-bold text-dark100_light900">Saved QUESTION</h1>
      
      <div className="mt-11 flex justify-between max-sm:flex-col sm:items-center gap-5">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search For Questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
      {result?.questions?.length ?
         result?.questions.map((question:any) => (
            <QuestionCard
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}

            />
          ))
          : <NoResult 
          title="There is no question saved to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
          link='/ask-question'
          linkTitle='Ask a Question'

          />}
      </div>
    </>
  );
}
