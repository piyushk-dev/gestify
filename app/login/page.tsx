"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginButton from "@/components/auth/login-button";

export default function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-3xl">
            Sign in to Gestify
          </CardTitle>
          <CardDescription>
            Access your personalized news experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <LoginButton />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-xs text-center text-gray-500">
            By signing in, you agree to our{" "}
            <a href="/terms" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
