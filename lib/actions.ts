'use server'
export const savePreferences = async (userId: string, preferences: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/preferences`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
    })
    if (!res.ok) {
        throw new Error("Failed to save preferences")
    }
    
    const data = await res.json()
    return data
}

export const formAction = async (formData: FormData) => {
    const preferences = {
    //   categories: Object.keys(defaultCategories).reduce((acc, key) => {
    //     acc[key] = formData.get(key) === "on"
    //     return acc
    //   }, {} as Record<string, boolean>),
    //   newsletter: formData.get("newsletter") === "on",
      email: formData.get("email")?.toString() || "",
    }
    // await savePreferences(userId, preferences)
}