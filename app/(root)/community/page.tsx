'use server'
import UserCard from "@/components/card/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";

const page = async ({searchParams}:SearchParamsProps) => {
  const results = await getAllUsers({
    searchQuery:searchParams.q,
    filter:searchParams.filter,
    page:searchParams.page ? +searchParams.page : 1
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">ALL Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search For amazing minds"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {results.users.length > 0 ? (
          results.users.map((user) =>( 
          <UserCard 
            key={user._id}
            user={user}
            />
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No Users Yet</p>
            <Link className="mt-2 font-bold" href='/sign-up'>
            Join to the first!
            </Link>
          </div>
        )}
      </section>
      <div className="mt-10 ">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={results!.isNext}
        />
      </div>
    </>
  );
};

export default page;
