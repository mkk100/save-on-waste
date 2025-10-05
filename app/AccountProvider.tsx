import { createClient } from "@/lib/supabase/client"; // Use your existing client

export const isCharityUser = async (): Promise<boolean> => {
  try {
    const supabase = createClient(); // Create client here

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error("Error fetching authenticated user:", authError);
      return false;
    }
    const userId = user.id;
    console.log("User ID:", userId); // Add this to verify execution

    // Fetch the user from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("account_type")
      .eq("user_id", userId)
      .single();

    console.log("Fetched profile data:", profile);
    console.log("Profile error:", profileError);

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      return false;
    }

    // Return whether the account_type is 'charity'
    return profile.account_type === "charity";
  } catch (error) {
    console.error("Unexpected error in isCharityUser:", error);
    return false;
  }
};
