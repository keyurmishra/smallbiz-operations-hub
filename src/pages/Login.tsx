
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-discord-darker py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-discord-light border-discord-lightest">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="bg-discord-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <LayoutDashboard className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Welcome back!</CardTitle>
          <CardDescription className="text-discord-muted-text">
            We're so excited to see you again!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-discord-text">EMAIL</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              className="bg-discord-darker border-none text-discord-text"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password" className="text-discord-text">PASSWORD</Label>
              <Link to="#" className="text-discord-link text-sm">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              className="bg-discord-darker border-none text-discord-text"
            />
          </div>
          <Button className="w-full bg-discord-primary hover:bg-discord-primary/90" size="lg">
            Log In
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-0">
          <div className="text-sm text-discord-muted-text">
            Need an account?{" "}
            <Link to="/signup" className="text-discord-link hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
