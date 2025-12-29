"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Github, Mail, Lock, User, Chrome } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { data } from "@/lib/constant";

export function AuthDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm font-medium">
          Sign In
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-0 overflow-hidden bg-background">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-center text-lg font-semibold text-foreground">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_4px_#ff4d4d]" />
              <span className="w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_4px_#facc15]" />
              <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_4px_#4ade80]" />
            </div>
            Welcome to <span className="text-primary">{data.appNameLogo}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full bg-background">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b bg-background">
            <TabsTrigger value="login" className="rounded-none">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="rounded-none">
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* ---- LOGIN TAB ---- */}
          <TabsContent value="login" className="p-6 space-y-5">
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="login-email">Email or Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    placeholder="you@example.com"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <Link href="#" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button className="w-full">Login</Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Chrome className="w-4 h-4" /> Google
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Github className="w-4 h-4" /> GitHub
                </Button>
              </div>
            </motion.form>
          </TabsContent>

          {/* ---- SIGNUP TAB ---- */}
          <TabsContent value="signup" className="p-6 space-y-5">
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-username"
                    placeholder="Choose a username"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    placeholder="you@example.com"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9"
                  />
                </div>
              </div>

              <Button className="w-full">Create Account</Button>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Chrome className="w-4 h-4" /> Google
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Github className="w-4 h-4" /> GitHub
                </Button>
              </div>
            </motion.form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
