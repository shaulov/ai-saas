"use client";

import { testimonials } from "@/const";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function LandingContent() {
  return (
    <section className="px-10 pb-20">
      <h2 className="mb-10 text-center text-4xl text-white font-extrabold">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map(item => (
          <Card className="text-white bg-[#192339] border-none" key={item.description}>
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-sm text-zinc-400">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default LandingContent;
