
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

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-discord-darker py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-discord-light border-discord-lightest">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="bg-discord-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <LayoutDashboard className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Create an account</CardTitle>
          <CardDescription className="text-discord-muted-text">
            Join our shop monitoring community
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
            <Label htmlFor="username" className="text-discord-text">USERNAME</Label>
            <Input
              id="username"
              placeholder="Create a username"
              className="bg-discord-darker border-none text-discord-text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-discord-text">PASSWORD</Label>
            <Input
              id="password"
              placeholder="Create a password"
              type="password"
              className="bg-discord-darker border-none text-discord-text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-discord-text">CONFIRM PASSWORD</Label>
            <Input
              id="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              className="bg-discord-darker border-none text-discord-text"
            />
          </div>
          <Button className="w-full bg-discord-primary hover:bg-discord-primary/90" size="lg">
            Sign Up
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-0">
          <div className="text-sm text-discord-muted-text">
            Already have an account?{" "}
            <Link to="/login" className="text-discord-link hover:underline">
              Log In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
