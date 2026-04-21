/**
 * Breed API
 * Handles breed-related HTTP requests
 */

import { publicApiClient } from "@/lib/api/apiClient";
import { BREED_API } from "@/lib/api/routes";
import { BreedResponse } from "@/lib/models/breedDTO";

export async function getBreedsApi(): Promise<BreedResponse> {
  const response = await publicApiClient.get<BreedResponse>(BREED_API.GET_BREEDS);
  return response.data;
}