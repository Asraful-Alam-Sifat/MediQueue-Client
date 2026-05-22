"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Card, Input, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const handleLoginFunc = async (data) => {
    const { email, password } = data;

    const { data: response, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      if (error.status === 401 || error.code === "INVALID_CREDENTIALS") {
        toast.warn("Incorrect email or password. Please try again.");
      } else if (error.status === 404) {
        toast.error("No account found with this email. Please register first.");
      } else {
        toast.error(error.message || "Login failed. Please try again later.");
      }
      return;
    }

    toast.success("Welcome back!");
    router.push("/");
  };

  return (
    <div>
      <Card className="w-full max-w-md bg-transparent p-2">
        <Card.Content>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleLoginFunc)}
          >
            <TextField
              className="w-full flex flex-col gap-1"
              name="email"
              type="email"
            >
              <Label className="font-sans text-[#81819a] text-base">
                Email
              </Label>
              <Input
                id="input-type-email"
                {...register("email", { required: true })}
                placeholder="jane@example.com"
                required
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
              />
            </TextField>

            <TextField
              className="w-full flex flex-col gap-1 mt-3"
              name="password"
              type="password"
            >
              <div className="flex justify-between items-center mb-1">
                <Label className="font-sans text-[#81819a] text-base">
                  Password
                </Label>

                <span className="font-sans text-[#2DE8A8] font-medium text-sm sm:text-base cursor-pointer hover:opacity-80">
                  Forgot?
                </span>
              </div>
              <Input
                id="input-type-password"
                placeholder="••••••••"
                {...register("password", { required: true })}
                required
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
              />
            </TextField>

            <Button
              type="submit"
              className="w-full rounded-[10px] bg-[#0DBF82] hover:bg-[#2DE8A8] text-[#081A12] font-semibold text-lg capitalize mt-3 shadow-[0_0_20px_rgba(74,255,196,0.15)] transition-all duration-150"
            >
              Sign In
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
};

export default LoginForm;
