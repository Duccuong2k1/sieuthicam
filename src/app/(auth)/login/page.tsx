"use client";
import { LoginDashboard } from "@/containers/dashboard/login/LoginDashboard";
import React, { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";
import { isCheckUser } from "@/components/shared/common/isCheckUser";
import { GLOBAL } from "@/libs/constants/global";

type Props = {};

export default function InfoAccountPage({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/login") && isCheckUser(GLOBAL.ADMIN)) {
      router.push("/dashboard");
    }
  }, [isCheckUser]);
  return <LoginDashboard />;
}
