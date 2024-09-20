import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error || !data?.user) {
    return redirect("/login");
  }

  if (
    data?.user?.user_metadata?.role === "admin" ||
    data?.user?.user_metadata?.role === "teacher"
  ) {
    return redirect("/teacher");
  }

  if (!data?.user?.user_metadata?.role) {
    // Show loading spinner while role is being fetched
    return <div>Loading...</div>;
  }

  return <p>Hello {data?.user?.email}</p>;
}
