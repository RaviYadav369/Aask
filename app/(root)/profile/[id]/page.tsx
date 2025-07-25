import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMonthAndYear, removeProtocol } from "@/lib/utils";
import { ProfileLink } from "@/components/shared/ProfileLink";
import QuestionTab from "@/components/shared/QuestionTab";
import AnswerTab from "@/components/shared/AnswerTab";
import Stats from "@/components/shared/Stats";

const page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo?.user.picture}
            alt="profile image"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              {userInfo.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{userInfo.user.username}
            </p>
            <div className="flex mt-5 flex-wrap items-center justify-start gap-5 ">
              {userInfo.user?.portfoliowebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={userInfo.user.portfoliowebsite}
                  title={removeProtocol(userInfo.user.portfoliowebsite)}
                />
              )}
              {userInfo.user?.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo.user.location}
                />
              )}
              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={`Joined ${getMonthAndYear(userInfo.user.joinedAt)}`}
              />
            </div>
            {userInfo.user?.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-5">
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href={`/profile/edit/${clerkId}`}>
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <div className="mt-5">
        <Stats
          totalquestions={userInfo.totalQuestion}
          totalAnswers={userInfo.totalAnswer}
          reputation={userInfo.user.reputation}
        />
      </div>
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <div className="mt-10 flex w-full flex-col gap-6">
              <QuestionTab
                searchParams={searchParams}
                userId={userInfo.user._id}
                clerkId={clerkId}
              />
            </div>
          </TabsContent>
          <TabsContent value="answers">
            <div className="mt-10 flex w-full flex-col gap-6">
              <AnswerTab
                searchParams={searchParams}
                userId={userInfo.user._id}
                clerkId={clerkId}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default page;
