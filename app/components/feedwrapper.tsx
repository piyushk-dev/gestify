// components/ExpandableSection.tsx
"use client";

import { useState, ReactNode } from "react";

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  initialExpanded?: boolean;
}

export default function ExpandableSection({
  title,
  children,
  initialExpanded = false,
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(initialExpanded);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold capitalize">{title}</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:underline px-4 py-2 rounded-md border border-blue-600"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      </div>
      {isExpanded && (
        <div className="border p-4 rounded-md bg-gray-50">{children}</div>
      )}
    </section>
  );
}