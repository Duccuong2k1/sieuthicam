"use client";
import { isCheckUser } from "@/components/shared/common/isCheckUser";
import { GLOBAL } from "@/libs/constants/global";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

export default function DashboardPage({}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.startsWith("/dashboard") && isCheckUser(GLOBAL.ADMIN)) {
      router.push("/dashboard/info");
    } else {
      router.push("/login");
    }
  }, [isCheckUser,router]);
  return null;
}
