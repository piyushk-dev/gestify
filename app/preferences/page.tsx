"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock function to save user preferences
const saveUserPreferences = async (userId: string, preferences: any) => {
  // Simulate API call
  console.log("Saving preferences for user", userId, preferences)
  return true
}

export default function PreferencesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [categories, setCategories] = useState({
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
  })
  const [sources, setSources] = useState({
    nytimes: true,
    washingtonpost: true,
    bbc: true,
    reuters: true,
    ap: true,
    guardian: false,
    economist: false,
    wsj: false,
    bloomberg: false,
    cnn: false,
  })
  const [updateFrequency, setUpdateFrequency] = useState("daily")
  const [articleLength, setArticleLength] = useState([3]) // 1-5 scale

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated") === "true"
    setIsAuthenticated(authStatus)

    // Redirect if not authenticated
    if (!authStatus) {
      router.push("/login?callbackUrl=/preferences")
    }
  }, [router])

  const handleSave = async () => {
    const userId = localStorage.getItem("userId")
    if (!userId) return

    setLoading(true)
    try {
      await saveUserPreferences(userId, {
        categories,
        sources,
        newsletter,
        updateFrequency,
        articleLength: articleLength[0],
      })
      // Show success message
      alert("Preferences saved successfully!")
    } catch (error) {
      console.error("Error saving preferences:", error)
      alert("Failed to save preferences. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    setCategories((prev) => ({
      ...prev,
      [category]: checked,
    }))
  }

  const handleSourceChange = (source: string, checked: boolean) => {
    setSources((prev) => ({
      ...prev,
      [source]: checked,
    }))
  }

  if (!isAuthenticated) {
    return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl">Sign in Required</CardTitle>
            <CardDescription>Please sign in to access your preferences</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">You need to be signed in to view and edit your preferences.</p>
            <Button asChild>
              <a href="/login?callbackUrl=/preferences">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
)
  }

  return (
<div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl font-bold mb-8">News Preferences</h1>

        <Tabs defaultValue="content">
          <TabsList className="mb-8">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
                <CardDescription>Select the topics you&rsquo;re interested in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">News Categories</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(categories
).map(([category, checked]) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={checked}
                            onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                          />
                          <Label htmlFor={`category-${category}`} className="capitalize">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Article Length Preference</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Shorter summaries</span>
                        <span>Detailed articles</span>
                      </div>
                      <Slider
                        value={articleLength}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={setArticleLength}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <Card>
              <CardHeader>
                <CardTitle>News Sources</CardTitle>
                <CardDescription>Select your preferred news sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(sources).map(([source, checked]) => (
                    <div key={source} className="flex items-center space-x-2">
                      <Checkbox
                        id={`source-${source}`}
                        checked={checked}
                        onCheckedChange={(checked) => handleSourceChange(source, checked as boolean)}
                      />
                      <Label htmlFor={`source-${source}`} className="capitalize">
                        {source === "nytimes"
                          ? "New York Times"
                          : source === "washingtonpost"
                            ? "Washington Post"
                            : source === "wsj"
                              ? "Wall Street Journal"
                              : source === "ap"
                                ? "Associated Press"
                                : source === "bbc"
                                  ? "BBC"
                                  : source}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Preferences</CardTitle>
                <CardDescription>Customize how you receive news updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Daily Newsletter</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Receive a daily news digest at 8:00 AM</p>
                      <p className="text-xs text-gray-500">
                        We&rsquo;ll send you a summary of top stories based on your interests
                      </p>
                    </div>
                    <Switch checked={newsletter} onCheckedChange={setNewsletter} />
                  </div>
                </div>

                {newsletter && (
                  <div>
                    <Label htmlFor="email">Email for newsletter</Label>
                    <Input id="email" type="email" placeholder="Your email address" defaultValue="" className="mt-1" />
                  </div>
                )}

                <div>
                  <h3 className="font-medium mb-3">Update Frequency</h3>
                  <Select value={updateFrequency} onValueChange={setUpdateFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time (as news breaks)</SelectItem>
                      <SelectItem value="hourly">Hourly updates</SelectItem>
                      <SelectItem value="daily">Daily digest (8:00 AM)</SelectItem>
                      <SelectItem value="weekly">Weekly roundup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Profile Information</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="account-email">Email</Label>
                      <Input id="account-email" defaultValue="" className="mt-1" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Privacy Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Allow data collection for personalization</p>
                        <p className="text-xs text-gray-500">
                          We use your reading history to improve article recommendations
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Share analytics with news sources</p>
                        <p className="text-xs text-gray-500">Helps our partner publications improve their content</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} disabled={loading} className="bg-black hover:bg-gray-800">
            {loading ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </div>
    </div>
  )
}
