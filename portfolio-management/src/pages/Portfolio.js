import * as XLSX from "xlsx";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function Portfolio() {
  const [returnsData, setReturnsData] = useState(null);
  const [equityCurve, setEquityCurve] = useState(null);
  const [drawdownData, setDrawdownData] = useState(null);
  const [monthlyReturns, setMonthlyReturns] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      // ⚠️ You must adapt these keys to match your Excel columns (e.g., Date, NAV, Returns)
      const dates = json.map(r => r.Date);
      const navs = json.map(r => r.NAV);
      const benchmark = json.map(r => r.Benchmark);
      const returns = json.map(r => r.Return);

      // Equity curve (Portfolio vs Benchmark)
      setEquityCurve({
        labels: dates,
        datasets: [
          { label: "Portfolio NAV", data: navs, borderColor: "green" },
          { label: "Benchmark", data: benchmark, borderColor: "blue" }
        ]
      });

      // Drawdown (peak - current)
      let peak = -Infinity;
      let drawdowns = [];
      navs.forEach(v => {
        peak = Math.max(peak, v);
        drawdowns.push(((v - peak) / peak) * 100);
      });
      setDrawdownData({
        labels: dates,
        datasets: [{ label: "Drawdown %", data: drawdowns, backgroundColor: "rgba(255,0,0,0.5)" }]
      });

      // Monthly returns bar chart
      setMonthlyReturns({
        labels: dates,
        datasets: [{ label: "Monthly Returns %", data: returns, backgroundColor: returns.map(v => v >= 0 ? "green" : "red") }]
      });

      // Trailing Returns Table (dummy values now)
      setReturnsData([
        { period: "YTD", value: "10.2%" },
        { period: "1M", value: "2.1%" },
        { period: "3M", value: "5.6%" },
        { period: "6M", value: "12.3%" },
        { period: "1Y", value: "18.9%" }
      ]);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="portfolio-container">
      <h2>Portfolio Stats</h2>
      <input type="file" onChange={handleFileUpload} />

      {returnsData && (
        <table>
          <thead>
            <tr>
              <th>Period</th>
              <th>Return</th>
            </tr>
          </thead>
          <tbody>
            {returnsData.map((row, i) => (
              <tr key={i}>
                <td>{row.period}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="chart-container">
        {equityCurve && <Line data={equityCurve} />}
      </div>

      <div className="chart-container">
        {drawdownData && <Bar data={drawdownData} />}
      </div>

      <div className="chart-container">
        {monthlyReturns && <Bar data={monthlyReturns} />}
      </div>
    </div>
  );
}
