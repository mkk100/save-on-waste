"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Change to client
import GrabButton from "@/app/components/GrabButton";

interface Business {
  uuid: number;
  street_name: string;
  unit_number: string;
  postal_code: string;
  name: string;
  latitude: number;
  longitude: number;
  meat_grams: number;
  vegetables_grams: number;
  carbohydrates_grams: number;
  dairy_grams: number;
  dessert_grams: number;
}

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function MapComponent() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const supabase = createClient(); // No await needed for client
        const { data: businessData } = await supabase
          .from("businesses")
          .select();
        if (businessData) {
          setBusinesses(businessData);
        }
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, []);

  if (loading) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      bounds={businesses.map((business) => [
        business.latitude,
        business.longitude,
      ])}
      zoom={11}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "600px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {businesses.map((business, index) => (
        <Marker
          key={business.uuid || index}
          position={[business.latitude, business.longitude]}
        >
          <Popup>
            {business.name}
            <br />
            <GrabButton
              meat_grams={business.meat_grams}
              vegetable_grams={business.vegetables_grams}
              carbohydrates_grams={business.carbohydrates_grams}
              dairy_grams={business.dairy_grams}
              dessert_grams={business.dessert_grams}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
