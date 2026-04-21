/**
 * Breed Hook
 * Handles breed business logic and state management
 * Provides breed operations to components
 */

import { useState, useCallback } from "react";
import { getBreedsApi } from "@/lib/api/breed/breed";
import { Breed } from "@/lib/models/breedDTO";

interface BreedState {
  breeds: Breed[];
  loading: boolean;
  error: string | null;
}

export function useBreed() {
  const [state, setState] = useState<BreedState>({
    breeds: [],
    loading: false,
    error: null,
  });

  const fetchBreeds = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await getBreedsApi();
      setState((prev) => ({
        ...prev,
        breeds: response.data,
        loading: false,
      }));
      return response.data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch breeds";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    fetchBreeds,
    clearError,
  };
}

export default useBreed;