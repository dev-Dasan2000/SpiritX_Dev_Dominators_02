"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SuccessDialog from "@/components/SuccessDailog";
import UserMethods from "../../api/user-methods";
import Loader2 from "@/components/Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import Link from "next/link";

export default function SignupForm() {
  // State for real-time feedback
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  // Define form with react hook form
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password field value
  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  // Simulated username availability check
  const handleUsernameChange = (value: string) => {
    if (value.length >= 8) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
    return value;
  };

  // Password strength validation
  const handlePasswordChange = (value: string) => {
    let strength = "";
    let progress = 0;

    // Check password
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_-]/.test(value);
    const hasMinLength = value.length > 8;

    // Define password strength levels
    if (value.length > 0) {
      if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasSpecialChar) {
        strength = "Weak password";
        progress = 30;
      } else if (value.length > 7 && value.length < 10) {
        strength = "Moderate password";
        progress = 70;
      } else {
        strength = "Strong password";
        progress = 100;
      }
    }

    setPasswordStrength(strength);

    // Update password match status when password changes
    if (confirmPassword) {
      setPasswordMatch(value === confirmPassword);
    }

    return value;
  };

  // Password match validation
  const handleConfirmPasswordChange = (value: string) => {
    if (value.length > 7) {
      setPasswordMatch(password === value);
    } else {
      setPasswordMatch(false);
    }
    return value;
  };

  // Handle form submission
  const onSubmit = async (formData: any) => {
    if (isAvailable && passwordMatch) {
      if (passwordStrength === "Strong password" || passwordStrength === "Moderate password") {
        try {
          setLoading(true);
          const retrievedData = await UserMethods.CreateUser(formData.username, formData.password);
          if (retrievedData.message == "User created successfully") {
            setOpenPopup(true);
          }
          else if (retrievedData.error) {
            setAuthError(retrievedData.error);
          }
        } catch (error: any) {
          setAuthError(error);
        }
        finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent mx-4">
      <Card className="w-full max-w-sm bg-gray-700 text-white shadow-lg rounded-lg border-none">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
          <p className="text-center text-gray-400 text-sm">Join our exclusive platform</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter username"
                        className="mt-1 bg-gray-800 border-none"
                        {...field}
                        onChange={(e) => {
                          field.onChange(handleUsernameChange(e.target.value));
                        }}
                      />
                    </FormControl>

                    <div className="items-center">
                      {/* Username availability feedback */}
                      <div className={`transition-all duration-1000 overflow-hidden max-h-0 ${isAvailable !== null ? 'max-h-40' : ''}`}>
                        {isAvailable !== null && (
                          <FormDescription
                            className={`text-sm ${isAvailable ? "text-green-400" : "text-red-400"}`}
                          >
                            {isAvailable ? "Username is valid" : "Username is invalid - must be at least 8 characters long"}
                          </FormDescription>
                        )}
                      </div>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="mt-1 bg-gray-800 border-none"
                        {...field}
                        onChange={(e) => {
                          field.onChange(handlePasswordChange(e.target.value));
                        }}
                      />
                    </FormControl>
                    <div className="items-center">
                      {/* Password strength feedback */}
                      <div className={`transition-all duration-1000 overflow-hidden max-h-0 ${passwordStrength ? 'max-h-40' : ''}`}>
                        {passwordStrength && (
                          <FormDescription className="text-sm text-green-400">
                            {passwordStrength}
                          </FormDescription>
                        )}
                      </div>
                    </div>
                    <div className="h-1 mt-2 bg-gray-500">
                      <div
                        className="h-full"
                        style={{
                          width: `${passwordStrength === "Weak password"
                            ? 30
                            : passwordStrength === "moderate password"
                              ? 70
                              : passwordStrength === "Strong password"
                                ? 100
                                : 0}%`,
                          backgroundColor: passwordStrength === "Strong password"
                            ? 'green'
                            : passwordStrength === "Moderate password"
                              ? 'yellow'
                              : 'red',
                        }}
                      ></div>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="mt-1 bg-gray-800 border-none"
                        {...field}
                        onChange={(e) => {
                          field.onChange(handleConfirmPasswordChange(e.target.value));
                        }}
                      />
                    </FormControl>
                    <div className="items-center">
                      {/* Confirm Password match feedback */}
                      <div className={`transition-all duration-1000 overflow-hidden max-h-0 ${passwordMatch !== null ? 'max-h-40' : ''}`}>
                        {passwordMatch !== null && (
                          <FormDescription
                            className={`text-sm ${passwordMatch ? "text-green-400" : "text-red-400"}`}
                          >
                            {passwordMatch ? "Passwords match" : "Passwords do not match"}
                          </FormDescription>
                        )}
                      </div>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Signup Button */}
              <p className="text-center text-red-400 text-sm">{authError}</p>
              <Button
                disabled={loading}
                type="submit"
                className="w-full bg-gradient-to-r py-6 rounded-full from-purple-500 to-blue-500 text-white hover:opacity-80"
              >
                {loading ? <Loader2 /> : "Create Account"}
              </Button>
            </form>
          </Form>

          {/* Already have an account? */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <Link href="/" className="text-blue-400 hover:underline">Sign In</Link>
          </p>
        </CardContent>
      </Card>
      {openPopup && <SuccessDialog iconType="success" message="Account created successfully" subMessage="You can now log in" showProgressBar={true} redirect="/" />}
    </div>
  );
}
