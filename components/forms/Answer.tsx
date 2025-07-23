/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { answerSchema } from "@/lib/validations";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";

interface Props {
  questionId: string;
  userId: string;
}

const Answer = ({ questionId, userId }: Props) => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const editorRef = useRef(null);
  const { mode } = useTheme();

  const pathname = usePathname();
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function handleCreateAnswer(data: z.infer<typeof answerSchema>) {
    setisSubmitting(true);
    if (!userId) toast.error("User is not Signed");
    try {
      if (!userId) return;
      await createAnswer({
        content: data.answer,
        author: userId,
        question: questionId,
        path: pathname,
      });
      toast.success("Answer is created");
    } catch (error) {
      toast.error("Error in creating Answer");
      console.log(error);
    } finally {
      setisSubmitting(false);
      // @ts-ignore
      editorRef.current.setContent("");
    }
  }

  return (
    <div className="my-5">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write Your answer here
        </h4>
        <Button
          className="btn light-border-2 text-primary-500 dark:text-primary-500 gap-1.5 px-4 py-2.5 shadow-none"
          onClick={() => {}}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an AI Answer
        </Button>
      </div>

      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col ">
                <FormLabel className="paragraph-semibold background-light900_dark300 text-dark400_light800"></FormLabel>
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
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
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:16px } ",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
