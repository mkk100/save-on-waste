"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import { createClient } from "@/lib/supabase/client";
import GrabButton from "@/app/components/GrabButton";

interface Business {
  uuid: number;
  street_name: string;
  unit_number: string;
  postal_code: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
  meat_grams: number;
  vegetables_grams: number;
  carbohydrates_grams: number;
  dairy_grams: number;
  dessert_grams: number;
}

const defaultCenter: [number, number] = [1.3521, 103.8198];

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
        const supabase = createClient();
        const { data: businessData, error } = await supabase
          .from("businesses")
          .select();

        if (error) {
          throw error;
        }

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

  const locations = useMemo(
    () =>
      businesses
        .map((business) => [business.latitude, business.longitude] as const)
        .filter(
          (entry): entry is [number, number] =>
            entry[0] !== null && entry[1] !== null,
        ),
    [businesses],
  );

  if (loading) {
    return <div>Loading map...</div>;
  }

  const mapCenter = locations[0] ?? defaultCenter;
  const mapBounds = locations.length > 1 ? locations : undefined;

  return (
    <MapContainer
      center={mapCenter}
      bounds={mapBounds}
      zoom={11}
      scrollWheelZoom
      style={{ height: "400px", width: "600px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {businesses.map((business, index) => {
        if (business.latitude === null || business.longitude === null) {
          return null;
        }

        return (
          <Marker
            key={business.uuid ?? index}
            position={[business.latitude, business.longitude]}
          >
            <Popup>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {business.name}
              </Typography>
              <GrabButton
                meat_grams={business.meat_grams ?? 0}
                vegetable_grams={business.vegetables_grams ?? 0}
                carbohydrates_grams={business.carbohydrates_grams ?? 0}
                dairy_grams={business.dairy_grams ?? 0}
                dessert_grams={business.dessert_grams ?? 0}
              />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
