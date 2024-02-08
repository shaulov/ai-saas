"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { useProModal } from "@/hooks/use-pro-modal";
import Heading from "@/components/heading";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "./constants";

export default function MusicPage() {
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const response = await axios.post("/api/video", values);
      setVideo(response.data);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Somthing went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <section>
      <Heading
        title="Video Generation"
        description="Turn your prompt into video"
        icon={Video}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            className="grid grid-cols-12 gap-2 w-full p-4 px-3 md:px-6 border rounded-lg focus-within:shadow-sm"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 rounded-none outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-b focus-visible:border-violet-500"
                      disabled={isLoading}
                      placeholder="An astronaut riding a horse"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center w-full p-8 rounded-lg">
              <Loader />
            </div>
          )}
          {!video && !isLoading && <Empty label="No video generated" />}
          {video && (
            <video className="w-full h-[360px] aspect-video mt-8" controls>
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </section>
  );
}
