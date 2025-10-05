import { createClient } from "@/lib/supabase/server";
import UploadButton from "./components/Button";

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("businesses").select();

  return (
    <div>
      <pre>
        {JSON.stringify(instruments, null, 2)}
      </pre>
      <UploadButton />
    </div>
  );
}
