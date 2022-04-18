import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/client";

export default function Home() {
    const router = useRouter();
    const user = supabaseClient.auth.user();

    React.useEffect(() => {
        if (!user) {
            router.push("/authenticate");
        } else {
            router.push("/library");
        }
    }, [user, router]);

    return <div className="flex h-full w-screen"></div>;
}
