import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAllAnswersById } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import ParsedHtml from "./ParsedHtml";
import Votes from "./Votes";
import Pagination from "./Pagination";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAllAnswersById({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {result.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b pt-10">
            <div className="flex items-center justify-between">
              <div className=" flex flex-1 justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 ">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex items-start  gap-1 sm:items-center "
                >
                  <Image
                    src={answer.author.picture}
                    width={24}
                    height={24}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-lg text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1 ml-0.5">
                      <span className="max-sm:hidden ">
                        - <span>Answered {getTimeStamp(answer.createdAt)}</span>
                      </span>
                    </p>
                  </div>
                </Link>
                <div className="flex flex-end">
                  <Votes
                    type="answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasupVoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasdownVoted={answer.downvotes.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <ParsedHtml data={answer.content} />
          </article>
        ))}
      </div>
      <div className="mt-10 ">
        <Pagination pageNumber={page ? +page : 1} isNext={result!.isNext} />
      </div>
    </div>
  );
};

export default AllAnswers;
