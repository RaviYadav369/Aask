"use client";
import { Input } from "@/components/ui/input";
import React, {  useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";

interface Props {
  userId: string;
  userDetail: any;
}

const Profile = ({ userId, userDetail }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitting, setisSubmitting] = useState(false);

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: userDetail.user.name || "",
      username: userDetail.user.username || "",
      portfoliowebsite: userDetail.user.portfoliowebsite || "",
      location: userDetail.user.location || "",
      bio: userDetail.user.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof editProfileSchema>) {
    setisSubmitting(true);
    try {
      await updateUser({
        clerkId: userId!,
        updateData: values,
        path: pathname,
      });
      router.push(`/profile/${userId}`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-10 mt-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col ">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Full Name <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="no-focus paragraph-regular text-dark300_light700 min-h-[56px] border background-light900_dark300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col ">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    UserName <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      placeholder="JohnDoe123"
                      {...field}
                      className="no-focus paragraph-regular text-dark300_light700 min-h-[56px] border background-light900_dark300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="portfoliowebsite"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col ">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Portflio Link <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      placeholder="www.johndoe.com"
                      {...field}
                      className="no-focus paragraph-regular text-dark300_light700 min-h-[56px] border background-light900_dark300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col ">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Location <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      placeholder="london uk"
                      {...field}
                      className="no-focus paragraph-regular text-dark300_light700 min-h-[56px] border background-light900_dark300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col ">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Bio <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="no-focus paragraph-regular text-dark300_light700 min-h-[56px] border background-light900_dark300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="primary-gradient w-fit float-right !text-light-900 "
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Profile;
