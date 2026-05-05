export interface PersonalInfo {
  userType: "Farmer" | "Other";
  first_name: string;
  last_name: string;
  nid: string;
  date_of_birth: string;
  gender: "Male" | "Female" | "Other";
  tin: string;
  bin?: string;
  profile_image?: File | null;
  nid_front?: File | null;
  nid_back?: File | null;
  phone: string;
  thana: string;
  union: string;
  village: string;
  zilla: string;
  // Image URLs from API response
  profile_image_url?: string;
  nid_front_image_url?: string;
  nid_back_image_url?: string;
}

// Process info response interface
export interface ProcessInfoResponse {
  status: string;
  message: string;
  data?: unknown;
}
