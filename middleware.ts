import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
// import { NextResponse } from "next/server";
// import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  // const supabase = createClient();

  // const { data, error } = await supabase.auth.getUser();
  // console.log("middleware user data:", data);
  try {
    const response = await updateSession(request);
    console.log("updateSession function was called", response);
    return response;
  } catch (error) {
    console.error("Error in middleware:", error);
    // return NextResponse.next(); // Allow the request to proceed if there is an error
  }
}

export const config = {
  matcher: ["/student/:path*", "/teacher/:path*"],
};
