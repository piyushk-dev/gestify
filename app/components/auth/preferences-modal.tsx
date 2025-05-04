"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { formAction } from "@/lib/actions";
import Link from "next/link";

export default function PreferencesModal({
  userId,
  hasPreferences,
}: {
  userId: string;
  hasPreferences: boolean;
}) {
  const categories = {
    world: true,
    business: true,
    technology: true,
    science: false,
    health: false,
    sports: false,
    politics: false,
    entertainment: false,
    education: false,
    travel: false,
  };

  // const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      if (!!userId && !hasPreferences) {
        setIsOpen(true);
      }
    })();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Customize Your News Feed
          </DialogTitle>
          <DialogDescription>
            Select the topics you&rsquo;re interested in to personalize your
            news experience.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="py-4 space-y-6">
          <div>
            <h3 className="font-medium mb-3">News Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(categories).map(([category, checked]) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    name={category}
                    defaultChecked={checked}
                  />
                  <Label htmlFor={category} className="capitalize">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Daily Newsletter</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">
                  Receive a daily news digest at 8:00 AM
                </p>
                <p className="text-xs text-gray-500">
                  We&rsquo;ll send you a summary of top stories based on your
                  interests
                </p>
              </div>
              <Switch id="newsletter" name="newsletter" defaultChecked={true} />
            </div>

            <div className="mt-4">
              <Label htmlFor="email">Email for newsletter</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email address"
                className="mt-1"
              />
            </div>
          </div>

          <Button type="button" variant="outline">
            <Link href="/preferences">More Options</Link>
          </Button>
          <div className="flex justify-between">
            <Button type="submit">Save Preferences</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
