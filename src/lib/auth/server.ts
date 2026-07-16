import { NextRequest } from "next/server";
import { User } from "@supabase/supabase-js";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function getRequestUser(request: NextRequest): Promise<User | null> {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;

  const token = authorization.slice(7).trim();
  if (!token) return null;

  const { data, error } = await getSupabaseAdmin().auth.getUser(token);
  if (error) return null;
  return data.user;
}
