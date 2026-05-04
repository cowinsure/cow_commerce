/**
 * Personal Info Hook
 * Handles personal info business logic and state management
 * Provides personal info operations to components
 */

import { useState, useCallback } from "react";
import {
  processPersonalInfoApi,
  getPersonalInfoApi,
} from "@/lib/api/personalInfo/personalInfo";
import { PersonalInfo, ProcessInfoResponse } from "@/lib/models/personalInfoDTO";

interface PersonalInfoState {
  loading: boolean;
  error: string | null;
  personalInfo: ProcessInfoResponse | null;
}

export function usePersonalInfo() {
  const [state, setState] = useState<PersonalInfoState>({
    loading: false,
    error: null,
    personalInfo: null,
  });

  /**
   * Submit personal info to the server
   * @param data - Personal info data to submit
   * @returns Process info response
   */
  const submitPersonalInfo = useCallback(
    async (data: PersonalInfo): Promise<ProcessInfoResponse> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await processPersonalInfoApi(data);
        setState((prev) => ({
          ...prev,
          loading: false,
          personalInfo: response,
        }));
        return response;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to submit personal info";
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    [],
  );

  /**
   * Fetch personal info from the server
   * @returns Process info response
   */
  const fetchPersonalInfo = useCallback(async (): Promise<ProcessInfoResponse> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await getPersonalInfoApi();
      setState((prev) => ({
        ...prev,
        loading: false,
        personalInfo: response,
      }));
      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch personal info";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  /**
   * Clear any error state
   */
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    submitPersonalInfo,
    fetchPersonalInfo,
    clearError,
  };
}
