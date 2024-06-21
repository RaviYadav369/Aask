import Profile from "@/components/forms/Profile";
import { getUserInfo } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const userInfo = await getUserInfo({ userId: params.id });
  return (
    <>
      <Profile userId={params.id} userDetail={userInfo} />
    </>
  );
};

export default page;
