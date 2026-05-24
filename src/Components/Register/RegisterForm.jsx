"use client";

import {
  Card,
  Label,
  TextField,
  Button,
  Input,
  FieldError,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";
import { TbBrandGoogle } from "react-icons/tb";

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const handleRegisterFunc = async (data) => {
    const { email, password, name, image } = data;

    const { data: responseData, error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (error) {
        console.log("AUTH ERROR:", error);
       const msg = error?.message?.toLowerCase() || "";

    if (msg.includes("email") && msg.includes("exist")) {
      toast.error("An account with this email already exists! Please sign in.");
    } else if (msg.includes("password") && msg.includes("weak")) {
      toast.error("Password is too weak. Use at least 8 characters.");
    } else if (msg.includes("invalid") && msg.includes("email")) {
      toast.error("Please enter a valid email address.");
    } else {
      toast.error(error.message || "Registration failed!");
    }
    return;
    }

    if (image) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await authClient.updateUser({ image });
    }

    toast.success("Account created successfully! Redirecting...");
    setTimeout(() => router.push("/login"), 2000);
  };

  const handleGoogleRegister = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  } catch (error) {
    const msg = error?.message?.toLowerCase() || "";
    if (msg.includes("email") && msg.includes("exist")) {
      toast.error("This Google account is already registered. Please sign in.");
    } else {
      toast.error(error.message || "Google sign-in failed!");
    }
  }
};

  return (
    <div>
       <div>
                <Link
          href={""}
          onClick={ handleGoogleRegister}
          className="sm:w-2/3 mx-auto border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] flex gap-1.5 px-10 py-2 mt-6 items-center justify-center"
        >
          <TbBrandGoogle className="text-red-500" />
          <span className="text-xs sm:text-sm"> Continue with Google</span>
        </Link>

    </div>


      <div className="grid grid-cols-3 items-center justify-evenly  my-6">
        <span className="bg-[#5B5C77]/35 h-px w-full "></span>
        <span className="text-center text-xs sm:text-sm font-light  text-[#5B5C77] capitalize ">
          or register with email
        </span>
        <span className="bg-[#5B5C77]/35 h-px w-full"> </span>
      </div>

      <Card className="w-full max-w-md bg-transparent p-2">
        <Card.Content>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleRegisterFunc)}
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <TextField
                className="w-full flex flex-col gap-1"
                isRequired
                isInvalid={!!errors.name}
              >
                <Label
                  htmlFor="input-type-name"
                  className="font-sans text-[#81819a] text-base flex gap-x-0"
                >
                  Username
                </Label>
                <Input
                  id="input-type-name"
                  placeholder="Username"
                  type="text"
                  {...register("name", {
                    required: "Username field is required",
                  })}
                  className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
                />

                <FieldError className="text-xs text-red-300/80 mt-1">
                  {errors.name?.message}
                </FieldError>
              </TextField>

              <TextField
                className="w-full flex flex-col gap-1"
                isRequired
                isInvalid={!!errors.image}
              >
                <Label
                  htmlFor="input-type-photo"
                  className="font-sans text-[#81819a] text-base"
                >
                  Photo URL
                </Label>
                <Input
                  id="input-type-photo"
                  placeholder="https://image.com/..."
                  type="url"
                  {...register("image", {
                    required: "Photo URL field is required",
                  })}
                  className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
                />
                <FieldError className="text-xs text-red-300/80 mt-1">
                  {errors.image?.message}
                </FieldError>
              </TextField>
            </div>

            <TextField
              className="w-full flex flex-col gap-1"
              isRequired
              isInvalid={!!errors.email}
            >
              <Label
                htmlFor="input-type-email"
                className="font-sans text-[#81819a] text-base"
              >
                Email
              </Label>
              <Input
                id="input-type-email"
                {...register("email", { required: "Email field is required" })}
                placeholder="you@example.com"
                type="email"
                required
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
              />
              <FieldError className="text-xs text-red-300/80 ">
                {errors.email?.message}
              </FieldError>
            </TextField>

            <TextField
              className="w-full flex flex-col gap-1"
              isRequired
              isInvalid={!!errors.password}
            >
              <div className="flex justify-between items-center mb-1">
                <Label
                  htmlFor="input-type-password"
                  className="font-sans text-[#81819a] text-base"
                >
                  Password
                </Label>
              </div>
              <Input
                id="input-type-password"
                placeholder="Min 6 chars, upper + lowercase"
                {...register("password", {
                  required: "Password field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: {
                    hasUppercase: (v) =>
                      /[A-Z]/.test(v) ||
                      "Must contain at least one uppercase letter",
                    hasLowercase: (v) =>
                      /[a-z]/.test(v) ||
                      "Must contain at least one lowercase letter",
                  },
                })}
                type="password"
                required
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
              />
              <FieldError className="text-xs text-red-300/80 mt-1">
                {errors.password?.message}
              </FieldError>
            </TextField>

            <Button
              type="submit"
              className="w-full rounded-[10px] bg-[#0DBF82] hover:bg-[#2DE8A8] text-[#081A12] font-semibold text-lg capitalize mt-3 shadow-[0_0_20px_rgba(74,255,196,0.15)] transition-all duration-150"
            >
              create account
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
};

export default RegisterForm;
