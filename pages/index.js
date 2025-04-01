import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const user = { name: "Luis", role: "Admin" };
  const [selectedProperties, setSelectedProperties] = useState(["Miami", "Orlando", "Tampa"]);
  const propertyOptions = ["Miami", "Orlando", "Tampa"];

  const mortgageData = {
    Miami: { payment: 4200, balance: 320000 },
    Orlando: { payment: 3000, balance: 220000 },
    Tampa: { payment: 2800, balance: 190000 },
  };

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedProperties(options);
  };

  const getCombinedFinancials = () => {
    const financialData = {
      Miami: { revenue: 100000, cogs: 30000, opex: 20000, netIncome: 50000, ebitda: 60000 },
      Orlando: { revenue: 40000, cogs: 10000, opex: 8000, netIncome: 22000, ebitda: 25000 },
      Tampa: { revenue: 30000, cogs: 5000, opex: 7000, netIncome: 18000, ebitda: 20000 },
    };

    const totals = { revenue: 0, cogs: 0, opex: 0, netIncome: 0, ebitda: 0 };
    selectedProperties.forEach((property) => {
      const data = financialData[property];
      if (data) {
        totals.revenue += data.revenue;
        totals.cogs += data.cogs;
        totals.opex += data.opex;
        totals.netIncome += data.netIncome;
        totals.ebitda += data.ebitda;
      }
    });

    const percent = (value) => ((value / totals.revenue) * 100).toFixed(1) + "%";
    return {
      revenue: `$${totals.revenue.toLocaleString()} (${percent(totals.revenue)})`,
      cogs: `$${totals.cogs.toLocaleString()} (${percent(totals.cogs)})`,
      opex: `$${totals.opex.toLocaleString()} (${percent(totals.opex)})`,
      netIncome: `$${totals.netIncome.toLocaleString()} (${percent(totals.netIncome)})`,
      ebitda: `$${totals.ebitda.toLocaleString()} (${percent(totals.ebitda)})`,
    };
  };

  const financials = getCombinedFinancials();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Select Properties</label>
        <select multiple className="w-full border p-2 rounded" onChange={handleSelectChange} value={selectedProperties}>
          {propertyOptions.map((property) => (
            <option key={property} value={property}>{property}</option>
          ))}
        </select>
      </div>
      <Card className="mb-6">
        <CardContent>
          <h2 className="text-lg font-semibold">Financial Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-2">
            <div><strong>Revenue:</strong> {financials.revenue}</div>
            <div><strong>COGS:</strong> {financials.cogs}</div>
            <div><strong>OPEX:</strong> {financials.opex}</div>
            <div><strong>Net Income:</strong> {financials.netIncome}</div>
            <div><strong>EBITDA:</strong> {financials.ebitda}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
