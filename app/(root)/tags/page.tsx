'use server'
import TagCard from "@/components/card/TagCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { GetAllTags } from "@/lib/actions/tag.action";
import React from "react";

const page = async () => {
  const results = await GetAllTags({});
  
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">ALL Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search For amazing minds"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {results.tags.length > 0 ? (
          results.tags.map((tag) =>( 
          <TagCard 
            key={tag._id}
            tag={tag}
            />
          ))
        ) : (
          <NoResult
          title="No Tags Yet"
          description="No tags found, please try again later"
          link="/ask-question"
          linkTitle="Ask a Question"
          />
        )}
      </section>
    </>
  );
};

export default page;
