import Image from "next/image";
import React from "react";

interface reputationProps {
  totalquestions: number;
  totalAnswers: number;
  reputation: number;
}
const Stats = ({
  totalquestions,
  totalAnswers,
  reputation,
}: reputationProps) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-1 flex text-dark100_light900 background-light800_dark300 paragraph-regular px-4 py-2">
        <div className="text-sm mx-1">{totalquestions} Questions </div>
        <div className="text-sm mx-1">{totalAnswers} Answers</div>
      </div>
      <div className="col-span-1 text-sm flex gap-2 text-dark100_light900 background-light800_dark300 paragraph-regular px-4 py-2">
        <Image
          src="/assets/icons/gold-medal.svg"
          width={30}
          height={30}
          alt="gold"
        />
        <div>
          {Math.floor(reputation / 500)}
          <div className="text-xs">Gold Badges</div>
        </div>
      </div>
      <div className="col-span-1 text-sm flex gap-2 text-dark100_light900 background-light800_dark300 paragraph-regular px-4 py-2">
        <Image
          src="/assets/icons/silver-medal.svg"
          width={30}
          height={30}
          alt="gold"
        />
        <div>
          {Math.floor(reputation / 100)}
          <div className="text-xs">Silver Badges</div>
        </div>
      </div>
      <div className="col-span-1 text-sm flex gap-2 text-dark100_light900 background-light800_dark300 paragraph-regular px-4 py-2">
        <Image
          src="/assets/icons/bronze-medal.svg"
          width={30}
          height={30}
          alt="gold"
        />
        <div>
          {Math.floor(reputation / 10)}
          <div className="text-xs">Bronze Badges</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
