import React from "react";
import { useInvestors } from "../api/hooks";
import { Investor } from "../types/investor";

interface InvestorListProps {
  onSelectInvestor: (investorId: number) => void;
}

const InvestorList: React.FC<InvestorListProps> = ({ onSelectInvestor }) => {
  const { data: investors, isLoading, error } = useInvestors();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Investors</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Country</th>
            <th>Date Added</th>
            <th>Last Updated</th>
            <th>Total Commitment (m)</th>
          </tr>
        </thead>
        <tbody>
          {investors?.map((investor: Investor) => (
            <tr
              key={investor.id}
              onClick={() => onSelectInvestor(investor.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{investor.id}</td>
              <td>{investor.name}</td>
              <td>{investor.investor_type}</td>
              <td>{investor.country}</td>
              <td>{investor.date_added}</td>
              <td>{investor.last_updated}</td>
              <td>{investor.total_commitment/1000000}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestorList;