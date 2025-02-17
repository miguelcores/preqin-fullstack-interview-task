import React, { useState, useEffect } from "react";
import { useCommitments } from "../api/hooks";
import { Commitment } from "../types/commitment";

interface CommitmentBreakdownProps {
  investorId: number;
}

const CommitmentBreakdown: React.FC<CommitmentBreakdownProps> = ({
  investorId,
}) => {
  const [assetClass, setAssetClass] = useState<string | undefined>(undefined);
  const { data: commitments, isLoading, error } = useCommitments(investorId, assetClass);

  // Reset assetClass filter when investorId changes
  useEffect(() => {
    setAssetClass(undefined);
  }, [investorId]);  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Commitments</h2>
      <div>
        <label>Filter by Asset Class:</label>
        <select 
          value={assetClass ?? ''} 
          onChange={(e) => {
            const value = e.target.value;
            setAssetClass(value === '' ? undefined : value);
          }}
        >
          <option value="">All</option>
          <option value="Hedge Funds">Hedge Funds</option>
          <option value="Private Equity">Private Equity</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Natural Resources">Natural Resources</option>
          <option value="Private Debt">Private Debt</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset Class</th>
            <th>Amount (m)</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          {commitments?.map((commitment: Commitment) => (
            <tr key={commitment.id}>
              <td>{commitment.id}</td>
              <td>{commitment.asset_class}</td>
              <td>{commitment.amount/1000000}</td>
              <td>{commitment.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommitmentBreakdown;