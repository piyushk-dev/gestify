"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CollapsibleSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id={id} className="border p-4 shadow-md bg-white scroll-mt-20">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className={expanded ? "" : "line-clamp-3 overflow-hidden"}>
        {children}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Collapse" : "Read More"}
      </Button>
    </section>
  );
}
