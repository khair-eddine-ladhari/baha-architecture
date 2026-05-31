import { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;
const LABEL = "text-[0.65rem] uppercase tracking-widest font-bold";

const generateMockData = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const label = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    data.push({ date: label, visits: Math.floor(Math.random() * 120) + 20 });
  }
  return data;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-black bg-white px-3 py-2">
      <p className={`${LABEL} text-gray-400 mb-1`}>{label}</p>
      <p className="text-base font-bold">{payload[0].value}</p>
    </div>
  );
};

const MENU_ITEMS = [
  { id: "projects", label: "Manage Projects" },
  { id: "news",     label: "Manage News" },
  { id: "messages", label: "Manage Messages" },
  { id: "settings", label: "Settings" },
];

export default function AdminDashboard({ setPage }) {
  const [stats, setStats]       = useState({ projects: null, news: null, messages: null });
  const [visitorData]           = useState(generateMockData);
  const [range, setRange]       = useState(30);
  const [menuOpen, setMenuOpen] = useState(false);

  const token   = sessionStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/api/projects`, { headers }).catch(() => null),
      axios.get(`${API_URL}/api/news`,     { headers }).catch(() => null),
      axios.get(`${API_URL}/api/messages`, { headers }).catch(() => null),
    ]).then(([p, n, m]) => {
      setStats({
        projects: p ? (Array.isArray(p.data) ? p.data.length : p.data?.projects?.length ?? 0) : "—",
        news:     n ? (Array.isArray(n.data) ? n.data.length : n.data?.news?.length     ?? 0) : "—",
        messages: m ? (Array.isArray(m.data) ? m.data.length : m.data?.messages?.length ?? 0) : "—",
      });
    });
  }, []);

  const totalVisits = visitorData.slice(-range).reduce((sum, d) => sum + d.visits, 0);
  const chartData   = visitorData.slice(-range);

  const handleNav = (id) => {
    setPage(id);
    setMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── TITLE ── */}
      <div className="border-b border-black px-6 sm:px-12 pt-8 pb-6">
        <p className={`${LABEL} text-gray-400 mb-1`}>Baha Architecture</p>
        <h1 className="text-2xl font-bold uppercase tracking-widest">Overview</h1>
      </div>

      {/* ── STAT CARDS — full width on mobile ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black border-b border-black">
        {[
          { label: "Visits",   value: totalVisits.toLocaleString(), note: "this month" },
          { label: "Messages", value: stats.messages,               note: "inbox" },
          { label: "Projects", value: stats.projects,               note: "portfolio" },
          { label: "News",     value: stats.news,                   note: "articles" },
        ].map((s) => (
          <div key={s.label} className="bg-white px-6 py-5 flex flex-col gap-1">
            <span className={`${LABEL} text-gray-400`}>{s.label}</span>
            <span className="text-3xl font-bold tracking-tight">{s.value ?? "—"}</span>
            <span className={`${LABEL} text-gray-300`}>{s.note}</span>
          </div>
        ))}
      </div>

      {/* ── MAIN AREA ── */}
      <div className="flex flex-1">

        {/* ── LEFT MENU — hidden on mobile, visible on desktop ── */}
        <aside className="hidden sm:flex flex-col border-r border-black w-48 shrink-0">
          <p className={`${LABEL} text-gray-300 px-6 pt-6 pb-3`}>Quick access</p>
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`text-left px-6 py-4 border-t border-black ${LABEL} text-gray-500
                hover:bg-black hover:text-white transition-colors duration-[250ms]`}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* ── RIGHT: chart ── */}
        <div className="flex-1 px-6 sm:px-8 py-6 flex flex-col gap-4">

          {/* chart header */}
          <div className="flex items-center justify-between">
            <p className={`${LABEL} text-gray-400`}>
              Visitors — last {range} days
            </p>
            <div className="flex border border-black">
              {[7, 30].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1 ${LABEL} transition-colors duration-[250ms]
                    ${range === r ? "bg-black text-white" : "text-gray-400 hover:text-black"}`}
                >
                  {r}d
                </button>
              ))}
            </div>
          </div>

          {/* chart */}
          <div className="w-full h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="20%"  stopColor="#000" stopOpacity={0.06} />
                    <stop offset="100%" stopColor="#000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="#f0f0f0" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 8, fontWeight: 700, fill: "#d1d5db" }}
                  tickLine={false}
                  axisLine={{ stroke: "#000", strokeWidth: 0.5 }}
                  interval={range === 7 ? 0 : 5}
                />
                <YAxis
                  tick={{ fontSize: 8, fontWeight: 700, fill: "#d1d5db" }}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "#000", strokeWidth: 0.5, strokeDasharray: "4 4" }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#000"
                  strokeWidth={1.5}
                  fill="url(#vg)"
                  dot={false}
                  activeDot={{ r: 3, fill: "#000", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className={`${LABEL} text-gray-300`}>* mock data — connect analytics api to go live</p>
        </div>
      </div>

      {/* ── MOBILE MENU — bottom bar ── */}
      <div className="sm:hidden border-t border-black">
        <div className="grid grid-cols-2 gap-px bg-black">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`bg-white text-left px-4 py-4 ${LABEL} text-gray-500
                hover:bg-black hover:text-white transition-colors duration-[250ms]`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}