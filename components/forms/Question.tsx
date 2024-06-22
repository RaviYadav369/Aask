/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { questionSchema } from "@/lib/validations";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";

interface Props {
  mongoUserId: string;
  type: string;
  qusetionDetails?: string;
}

const Question = ({ mongoUserId, type, qusetionDetails }: Props) => {
  console.log(qusetionDetails);
  const router = useRouter();
  const pathname = usePathname();
  const { mode } = useTheme();
  const editorRef = useRef(null);
  const [isSubmitting, setisSubmitting] = useState(false);

  const parseQuestionDetails = qusetionDetails && JSON.parse(qusetionDetails || "")
  const groupedTags = parseQuestionDetails && parseQuestionDetails.tags.map((tag: any) => tag.name);

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: parseQuestionDetails?.title || "",
      explanation: parseQuestionDetails?.content || "",
      tags: groupedTags || [],
    },
  });
  async function onSubmit(values: z.infer<typeof questionSchema>) {
    setisSubmitting(true);
    try {
      if (type === "edit") {
        await editQuestion({
          questionId: parseQuestionDetails._id,
          title: values.title,
          content: values.explanation,
          path: pathname,
        });

        router.push(`/question/${parseQuestionDetails._id}`);
      } else {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          path: pathname,
        });
        router.push("/");
      }
    } catch (error) {
    } finally {
      setisSubmitting(false);
    }
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTag = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTag);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-10 mt-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col ">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Question Title <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    placeholder="shadcn"
                    {...field}
                    className="no-focus paragraph-regular text-dark300_light700 min-h-[56px] border background-light900_dark300"
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Be specific and imagine you&apos;re asking a question to
                  another person
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Detailed explanation of your problem{" "}
                  <span className="text-primary-500">*</span>{" "}
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    initialValue={parseQuestionDetails?.content || ""}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist | ",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Inroduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col ">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Question Title <span className="text-primary-500">*</span>{" "}
                </FormLabel>
                <FormControl className="mt-3.5">
                  <>
                    <Input
                      placeholder="Add tags..."
                      disabled={type === "edit"}
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                      className="no-focus paragraph-regular text-dark300_light700 min-h-[56px] border background-light900_dark300"
                    />
                    {field.value.length > 0 && (
                      <div className="flex-start mt-2.5 gap-2.5">
                        {field.value.map((tag: any) => (
                          <Badge
                            key={tag}
                            className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md px-4 py-2 capitalize border-none"
                            onClick={() =>
                              type !== "edit"
                                ? handleTagRemove(tag, field)
                                : () => {}
                            }
                          >
                            {tag}
                            {type !== "edit" && (
                              <Image
                                src="/assets/icons/close.svg"
                                width={12}
                                height={12}
                                alt="close icon"
                                className="cursor-pointer object-contain invert-0 dark:invert"
                              />
                            )}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Add up to 3 tags to describe what your question is about. You
                  need to press enter to add a tag
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900 "
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>{type === "edit" ? "Editing..." : "Posting..."}</>
            ) : (
              <>{type === "edit" ? "Edit Question" : "Ask Question"}</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Question;
