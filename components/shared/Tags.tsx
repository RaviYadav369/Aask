import Link from "next/link";
import React from "react";

interface props {
  _id: number;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const Tags = ({ _id, name, totalQuestions, showCount }: props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
    
    </Link>
  )
};

export default Tags;
