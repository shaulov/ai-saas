"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import Heading from "@/components/heading";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import BotAvatar from "@/components/bot-avatar";
import UserAvatar from "@/components/user-avatar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "./constants";

export default function ConversationPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
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
      const userMessage: any = {
        role: "user",
        content: values.prompt,
      };

      const response = await axios.post("/api/conversation", {
        message: userMessage.content,
      });

      const newMessage: any = {
        role: "assistant",
        content: response.data.join(" "),
      };

      setMessages((current) => [...current, userMessage, newMessage]);
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
        title="Conversation"
        description="Our most advanced conversation model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                      placeholder="How do I calculate the radius of a circle?"
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
            <div className="flex items-center justify-center w-full p-8 bg-muted rounded-lg">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started" />
          )}
          <ul className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <li
                className={cn(
                  "flex items-center gap-x-4 w-full p-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border-black/10"
                    : "bg-muted",
                )}
                key={message.content}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
