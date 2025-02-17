import React, { useState } from "react";
import InvestorList from "./components/InvestorList";
import CommitmentBreakdown from "./components/CommitmentBreakdown";
import "./styles/table.css";

const App: React.FC = () => {
  const [selectedInvestorId, setSelectedInvestorId] = useState<number | null>(null);

  return (
    <div>
      <InvestorList onSelectInvestor={setSelectedInvestorId} />
      {selectedInvestorId && (
        <CommitmentBreakdown investorId={selectedInvestorId} />
      )}
    </div>
  );
};

export default App;