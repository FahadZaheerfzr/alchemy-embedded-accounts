"use client";

import { LogInCard } from "@/components/LogInCard";
import { ProfileCard } from "@/components/ProfileCard";
import { useAccount, useUser } from "@alchemy/aa-alchemy/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [state, setState] = useState<string>("loading");
  const { account, address, isLoadingAccount } = useAccount({
    type: "MultiOwnerModularAccount",
  });
  const user = useUser();
  
  useEffect(() => {
    console.log("account", account);
    console.log("address", address);
    console.log("user", user);
    if (account != null && address != null && user != null) {
      setState("loaded");
    }
  }
  , [account, address]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      {isLoadingAccount && !address ? (
        // Loading spinner
        <div className="flex items-center justify-center">
          <div
            className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          ></div>
        </div>
      ) : // the account might be reconnecting, in which case the account is null, but we have the address
      state === "loaded" ? (
        <ProfileCard />
      ) : (
        <LogInCard />
      )}
    </main>
  );
}