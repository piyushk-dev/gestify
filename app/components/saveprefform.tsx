"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTransition, useState } from "react";
import { savePreferences } from "@/lib/actions";
const CATEGORIES = [
  "trending",
  "politics",
  "horoscope",
  "career and jobs",
  "sports/chess",
  "international",
  "tech",
  "sports/cricket",
  "education",
];

export default function SavePreferencesForm({
  savedPrefs,
  savedConsent,
}: {
  savedPrefs: string[];
  savedConsent: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ⛔ prevent full form submission
    const formData = new FormData(e.currentTarget);
    setSaved(false);
    startTransition(async () => {
      await savePreferences(formData);
      setSaved(true);
    });
  };

  return (
    <form onSubmit={onFormSubmit} className="space-y-8">
      <Card className="shadow-xl border border-gray-300">
        <CardHeader>
          <CardTitle className="text-2xl">Content Preferences</CardTitle>
          <CardDescription>Select topics you care about most</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-lg text-gray-800">
                News Categories
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CATEGORIES.map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Checkbox
                      id={cat}
                      name="categories"
                      value={cat}
                      defaultChecked={savedPrefs.includes(cat)}
                    />
                    <Label
                      htmlFor={cat}
                      className="capitalize text-gray-700 text-sm"
                    >
                      {cat.includes("/")
                        ? cat.split("/")[1]
                        : cat.replace(/-/g, " ")}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md shadow-sm">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="dailyMailConsent"
                  name="dailyMailConsent"
                  defaultChecked={savedConsent}
                />
                <Label
                  htmlFor="dailyMailConsent"
                  className="text-sm font-medium text-yellow-900 leading-snug"
                >
                  I want to receive my personalised newsletter every morning at{" "}
                  <strong>7:00 AM</strong>
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end items-center space-x-4">
        {saved && (
          <span className="text-green-600 text-sm">Preferences saved!</span>
        )}
        <Button
          type="submit"
          className="bg-black hover:bg-gray-800 px-6 py-2 text-base"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </form>
  );
}
