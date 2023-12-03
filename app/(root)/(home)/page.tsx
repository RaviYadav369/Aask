import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
      <h1 className="h1-bold text-dark100_light900">ALL QUESTION</h1>
      <Link href="/ask-question" className="flex justify-end max-sm:w-full">
        <Button className="primary-gradient min-h-[46px] px-4 py-3 max-sm:w-full">
          Ask a Question
        </Button>
      </Link>
    </div>
    <div className="mt-11 flex justify-between max-sm:flex-col sm:items-center gap-5">

    </div>
    </>
  );
}
