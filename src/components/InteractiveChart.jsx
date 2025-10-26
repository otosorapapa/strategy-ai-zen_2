import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ReferenceLine,
} from "recharts";

const chartData = [
  {
    name: "企業のAI活用",
    現在: 78,
    数ヶ月前: null,
    note: "Stanford HAI AI Index (2024)",
  },
  {
    name: "米国SMB",
    現在: 52,
    数ヶ月前: 48,
    note: "AI and US SMBs 2024",
  },
  {
    name: "CSサポート生産性",
    現在: 14,
    数ヶ月前: null,
    note: "NBER Working Paper",
  },
];

const tooltipStyle = {
  background: "#06162c",
  color: "#ffffff",
  borderRadius: "12px",
  border: "none",
  padding: "1rem 1.25rem",
  boxShadow: "0 14px 32px rgba(6,22,44,0.25)",
};

// インタラクティブな可視化を独立させ保守性を高める
const InteractiveChart = () => (
  <div style={{ height: 360, background: "var(--lp1-white)", borderRadius: "24px", padding: "1.5rem", boxShadow: "0 18px 36px rgba(6,22,44,0.08)" }} data-fade="true">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(12,37,66,0.12)" />
        <XAxis dataKey="name" tick={{ fill: "#334155", fontFamily: "Noto Sans JP" }} />
        <YAxis tick={{ fill: "#334155", fontFamily: "Noto Sans JP" }} />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(value, key) => {
            if (value === null || value === undefined) {
              return ["データなし", key];
            }
            return [`${value}%`, key];
          }}
          labelFormatter={(label, payload) => {
            const note = payload?.[0]?.payload?.note;
            return note ? `${label}｜${note}` : label;
          }}
        />
        <Legend
          wrapperStyle={{ paddingTop: 20 }}
          iconType="circle"
          formatter={(value) => (
            <span style={{ color: "#334155", fontWeight: 600 }}>{value}</span>
          )}
        />
        <ReferenceLine y={50} stroke="rgba(200,166,70,0.6)" strokeDasharray="6 6" label={{ value: "経営者の意思決定ライン", position: "insideTop", fill: "#0c2542", fontWeight: 600 }} />
        <Bar dataKey="現在" fill="url(#currentGradient)" radius={[12, 12, 0, 0]} name="現在" />
        <Bar dataKey="数ヶ月前" fill="url(#pastGradient)" radius={[12, 12, 0, 0]} name="数ヶ月前" />
        <defs>
          <linearGradient id="currentGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--lp1-green-400)" />
            <stop offset="100%" stopColor="var(--lp1-green-500)" />
          </linearGradient>
          <linearGradient id="pastGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--lp1-gold-400)" />
            <stop offset="100%" stopColor="var(--lp1-gold-500)" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default InteractiveChart;
