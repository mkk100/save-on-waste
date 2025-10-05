import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("./Map"), { ssr: !!false });

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("businesses").select();
  return (
    <pre>
      {JSON.stringify(instruments, null, 2)}
      <Button>Hello World</Button>
      <DynamicMapComponent />
    </pre>
  );
}
