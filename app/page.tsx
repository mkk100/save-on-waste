import Dashboard from "@/components/Dashboard";
import { createClient } from "@/lib/supabase/server";

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("businesses").select();

  return (
    <>
      <pre>{JSON.stringify(instruments, null, 2)}</pre>
      <Dashboard
        instruments={instruments || []}
        logoPath="/path/to/your/logo.png" // Replace with your logo path
      />
    </>
  );
}
