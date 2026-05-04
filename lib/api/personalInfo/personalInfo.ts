import {
  PersonalInfo,
  ProcessInfoResponse,
} from "@/lib/models/personalInfoDTO";
import apiClient from "../apiClient";
import { PERSONALINFO_SERVICE_API } from "../routes";

// POST personal Info
export async function processPersonalInfoApi(
  data: PersonalInfo,
): Promise<ProcessInfoResponse> {
  // Create FormData for multipart/form-data upload
  const formData = new FormData();
  
  // Append all fields
  formData.append("userType", data.userType);
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("nid", data.nid);
  formData.append("date_of_birth", data.date_of_birth);
  formData.append("gender", data.gender.toLowerCase());
  formData.append("tin", data.tin);
  
  if (data.bin) {
    formData.append("bin", data.bin);
  }
  
  // Append files if they exist
  if (data.profile_image) {
    formData.append("profile_image", data.profile_image);
  }
  
  if (data.nid_front) {
    formData.append("nid_front", data.nid_front);
  }
  
  if (data.nid_back) {
    formData.append("nid_back", data.nid_back);
  }
  
  formData.append("phone", data.phone);
  formData.append("thana", data.thana);
  formData.append("union", data.union);
  formData.append("village", data.village);
  formData.append("zilla", data.zilla);

  const response = await apiClient.post<ProcessInfoResponse>(
    PERSONALINFO_SERVICE_API.CREATE_PERSONAL_INFO,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}

// GET personal Info
export async function getPersonalInfoApi(): Promise<ProcessInfoResponse> {
  const response = await apiClient.get<ProcessInfoResponse>(
    PERSONALINFO_SERVICE_API.GET_PERSONAL_INFO,
  );
  return response.data;
}
