import { createClient } from "@supabase/supabase-js";

// TODO: replace to dotenv
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://jjgkztugfylksrcdbaaq.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZ2t6dHVnZnlsa3NyY2RiYWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MDE1NjgsImV4cCI6MjAyNDE3NzU2OH0.GoN8RpyX_3bjddkMP9EdjFC_EObRq6kqe_EzvV5WBAs"
);