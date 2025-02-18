import React from "react";
import { useInvestors } from "../api/hooks";
import ErrorBoundary from "./ErrorBoundary";

interface InvestorListProps {
  onSelectInvestor: (investorId: number) => void;
}

const InvestorListContent: React.FC<InvestorListProps> = ({ onSelectInvestor }) => {
  const { data: investors, isLoading, error } = useInvestors();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Validate data
  if (!Array.isArray(investors)) {
    throw new Error('Invalid data format: Expected an array of investors');
  }

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
          {investors.map((investor) => (
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
              <td>{(investor.total_commitment/1000000).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const InvestorList: React.FC<InvestorListProps> = (props) => (
  <ErrorBoundary>
    <InvestorListContent {...props} />
  </ErrorBoundary>
);

export default InvestorList;