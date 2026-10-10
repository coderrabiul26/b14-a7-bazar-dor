"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
Button,
Description,
FieldError,
Form,
Input,
Label,
TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
const router = useRouter();
const [isSubmitting, setIsSubmitting] = useState(false);
const [isGoogleLoading, setIsGoogleLoading] = useState(false);

const onSubmit = async (e) => {
e.preventDefault();


if (isSubmitting) return;

const formData = new FormData(e.currentTarget);

const user = Object.fromEntries(formData.entries());

setIsSubmitting(true);

try {
  const { data, error } = await signUp.email({
    name: String(user.name).trim(),
    email: String(user.email).trim(),
    password: String(user.password),
    callbackURL: "/signin",
  });

  console.log("Signup response:", { data, error });

  if (error) {
    toast.error(error.message || "Registration failed");
    return;
  }

  if (!data) {
    toast.error("Registration could not be completed. Please try again.");
    return;
  }

  toast.success(
    "Registration successful! You can now continue to sign in.",
    { duration: 4000 }
  );

  router.push("/signin");
} catch (err) {
  console.error("Signup error:", err);
  toast.error("Something went wrong. Please try again.");
} finally {
  setIsSubmitting(false);
}


};

const handleGoogleSignIn = async () => {
if (isGoogleLoading) return;

setIsGoogleLoading(true);

try {
  const { error } = await signIn.social({
    provider: "google",
    callbackURL: "/",
  });

  if (error) {
    toast.error(error.message || "Google sign-in failed");
    setIsGoogleLoading(false);
  }
} catch (err) {
  console.error("Google sign-in error:", err);
  toast.error("Unable to sign in with Google. Please try again.");
  setIsGoogleLoading(false);
}


};

return ( <div className="container mx-auto flex justify-center h-screen mt-10"> <Form
     className="flex w-96 flex-col gap-4"
     onSubmit={onSubmit}
   > <h1 className="text-center bg-gray-100 rounded-lg py-2 px-3">
Registration Form </h1>

    <TextField
      isRequired
      name="name"
      validate={(value) => {
        if (value.trim().length < 3) {
          return "Name must be at least 3 characters";
        }

        return null;
      }}
    >
      <Label>Name</Label>
      <Input placeholder="Enter your name" />
      <FieldError />
    </TextField>

    <TextField
      isRequired
      name="email"
      type="email"
      validate={(value) => {
        if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        ) {
          return "Please enter a valid email address";
        }

        return null;
      }}
    >
      <Label>Email</Label>
      <Input placeholder="Enter your email" />
      <FieldError />
    </TextField>

    <TextField
      isRequired
      minLength={8}
      name="password"
      type="password"
      validate={(value) => {
        if (value.length < 8) {
          return "Password must be at least 8 characters";
        }

        if (!/[A-Z]/.test(value)) {
          return "Password must contain at least one uppercase letter";
        }

        if (!/[0-9]/.test(value)) {
          return "Password must contain at least one number";
        }

        return null;
      }}
    >
      <Label>Password</Label>
      <Input placeholder="Enter your password" />
      <Description>
        Must be at least 8 characters with 1 uppercase letter and 1 number
      </Description>
      <FieldError />
    </TextField>

    <div className="flex gap-2 justify-between items-center flex-wrap">
      <Button type="submit" isDisabled={isSubmitting}>
        <Check />
        {isSubmitting ? "Registering..." : "Register"}
      </Button>

      <Link href="/signin">
        <span className="text-gray-400 mr-2">Already have account?</span> <Button type="button" variant="secondary">
          Login
        </Button>
      </Link>
    </div>
    <Button
        type="button"
        onClick={handleGoogleSignIn}
        isDisabled={isGoogleLoading}
        className="bg-violet-500 w-full"
      >
        {isGoogleLoading ? "Redirecting..." : "Sign in with Google"}
      </Button>
  </Form>
</div>


);
};

export default SignUpPage;
