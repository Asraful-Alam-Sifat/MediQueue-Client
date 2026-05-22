"use client";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  Label,
  TextField,
  Button,
  Input,
  FieldError,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
      name: name,
      image: image,
    });

    if (error) {
      toast.error(error.message || "Register failed!");
    } else {
      

      toast.success("Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div>
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

              <TextField className="w-full flex flex-col gap-1">
                <Label
                  htmlFor="input-type-image"
                  className="font-sans text-[#81819a] text-base"
                >
                  Photo URL
                </Label>
                <Input
                  id="input-type-image"
                  placeholder="https://image.com/..."
                  type="url"
                  {...register("photo")}
                  className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
                />
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
                placeholder="Min 8 chars,upper + lowercase"
                {...register("password", {
                  required: "Password field is required",
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
