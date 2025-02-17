import { useQuery } from "@tanstack/react-query";
import apiClient from "./client";
import { Investor } from "../types/investor";
import { Commitment } from "../types/commitment";

// Fetch all investors
export const useInvestors = () => {
  return useQuery<Investor[]>({
    queryKey: ["investors"],
    queryFn: async () => {
      const response = await apiClient.get("/investors");
      console.log(response.data);
      return response.data;
    },
  });
};

// Fetch commitments for a specific investor
export const useCommitments = (investorId: number, assetClass?: string) => {
  return useQuery<Commitment[]>({
    queryKey: ["commitments", investorId, assetClass],
    queryFn: async () => {
      const response = await apiClient.get(`/commitments/${investorId}`, {
        params: { asset_class: assetClass },
      });
      return response.data;
    },
  });
};