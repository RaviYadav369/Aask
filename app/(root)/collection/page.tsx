import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import React from "react";

const questions = [
  {
    _id: "1",
    title: "Sample Title 1",
    tags: [
      { _id: "101", name: "Tag 1" },
      { _id: "102", name: "Tag 2" },
    ],
    author: {
      _id: "abc123",
      name: "John Doe",
      picture: "https://example.com/picture1.jpg",
    },
    upvotes: 150052,
    views: 1003500,
    answers: [],
    createdAt: new Date("2023-01-15T10:30:00Z"),
  },
  {
    _id: "2",
    title: "Another Title",
    tags: [
      { _id: "103", name: "Tag 3" },
      { _id: "104", name: "Tag 4" },
    ],
    author: {
      _id: "def456",
      name: "Jane Smith",
      picture: "https://example.com/picture2.jpg",
    },
    upvotes: 1080000,
    views: 7000005,
    answers: [],
    createdAt: new Date("2022-03-20T15:45:00Z"),
  },
];

const page = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions?.length ? (
          questions.map((question) => (
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
        ) : (
          <NoResult
            title="There is no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
            discussion. our query could be the next big thing others learn from. Get
            involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default page;
