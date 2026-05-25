"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function GoogleLoginCallback() {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      try {
        const { data: session } = await authClient.getSession();

        if (!session?.user) {
          toast.error("Google login failed. Please try again.");
          router.replace("/login");
          return;
        }

        const createdAt = new Date(session.user.createdAt);
        const now = new Date();
        const secondsDiff = (now - createdAt) / 1000;

        if (secondsDiff < 10) {
          await authClient.signOut();
          router.replace("/login");
          setTimeout(() => {
            toast.error("No account found. Please register first.");
          }, 300);
          return;
        }

        router.replace("/");
        setTimeout(() => {
          toast.success("Welcome back!");
        }, 300);
      } catch (err) {
        router.replace("/login");
        setTimeout(() => {
          toast.error("Something went wrong. Please try again.");
        }, 300);
      }
    };

    check();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#191921]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-full border-4 border-white/20 border-t-white rounded-full animate-spin flex justify-center items-center" />
      </div>
    </div>
  );
}
