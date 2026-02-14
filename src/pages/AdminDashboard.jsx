import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, ShoppingCart, TrendingUp, Menu, X, Bell, Search, MoreVertical, ArrowUp, ArrowDown } from 'lucide-react';

// Sample data - replace with your actual data source
const salesData = [
  { month: 'Jan', revenue: 4200, orders: 145 },
  { month: 'Feb', revenue: 3800, orders: 132 },
  { month: 'Mar', revenue: 5100, orders: 178 },
  { month: 'Apr', revenue: 4600, orders: 156 },
  { month: 'May', revenue: 5900, orders: 201 },
  { month: 'Jun', revenue: 6800, orders: 234 },
];

const recentOrders = [
  { id: '#3492', customer: 'Sarah Johnson', amount: '$245.00', status: 'Completed', time: '2 mins ago' },
  { id: '#3491', customer: 'Michael Chen', amount: '$892.00', status: 'Processing', time: '15 mins ago' },
  { id: '#3490', customer: 'Emma Williams', amount: '$156.00', status: 'Completed', time: '1 hour ago' },
  { id: '#3489', customer: 'James Brown', amount: '$423.00', status: 'Pending', time: '2 hours ago' },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 1247, revenue: '$124,700', trend: '+12%' },
  { name: 'Smart Watch Pro', sales: 892, revenue: '$89,200', trend: '+8%' },
  { name: 'Laptop Stand', sales: 654, revenue: '$32,700', trend: '-3%' },
  { name: 'USB-C Hub', sales: 543, revenue: '$27,150', trend: '+15%' },
];

const StatCard = ({ icon: Icon, title, value, change, changeType }) => (
  <div className="stat-card">
    <div className="stat-header">
      <div className="stat-icon">
        <Icon size={24} />
      </div>
      <button className="stat-more">
        <MoreVertical size={18} />
      </button>
    </div>
    <div className="stat-body">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${changeType}`}>
        {changeType === 'positive' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        {change} vs last month
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary: #0F172A;
          --primary-light: #1E293B;
          --accent: #3B82F6;
          --accent-dark: #2563EB;
          --success: #10B981;
          --warning: #F59E0B;
          --danger: #EF4444;
          --bg: #F8FAFC;
          --surface: #FFFFFF;
          --border: #E2E8F0;
          --text-primary: #0F172A;
          --text-secondary: #64748B;
          --text-muted: #94A3B8;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .dashboard-container {
          font-family: 'Urbanist', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--bg);
          min-height: 100vh;
          display: flex;
          color: var(--text-primary);
        }

        /* Sidebar */
        .sidebar {
          width: 280px;
          background: var(--primary);
          padding: 2rem 0;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
        }

        .sidebar.closed {
          transform: translateX(-100%);
        }

        .sidebar-brand {
          padding: 0 2rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 2rem;
        }

        .brand-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: white;
          letter-spacing: -0.02em;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 0.25rem;
          font-family: 'JetBrains Mono', monospace;
        }

        .nav-section {
          margin-bottom: 2rem;
        }

        .nav-label {
          padding: 0 2rem;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 2rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border-left: 3px solid transparent;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .nav-item.active {
          background: rgba(59, 130, 246, 0.1);
          color: var(--accent);
          border-left-color: var(--accent);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 280px;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-content.expanded {
          margin-left: 0;
        }

        /* Header */
        .header {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 1.5rem 2rem;
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.8);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1600px;
          margin: 0 auto;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-primary);
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .menu-toggle:hover {
          background: var(--bg);
        }

        .search-box {
          position: relative;
          width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 1px solid var(--border);
          border-radius: 12px;
          font-size: 0.9rem;
          font-family: 'Urbanist', sans-serif;
          transition: all 0.2s;
          background: var(--bg);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.625rem;
          border-radius: 10px;
          color: var(--text-secondary);
          transition: all 0.2s;
          position: relative;
        }

        .icon-button:hover {
          background: var(--bg);
          color: var(--text-primary);
        }

        .icon-button .badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: var(--danger);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 2px solid var(--surface);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--accent), var(--accent-dark));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .user-avatar:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }

        /* Content Area */
        .content {
          padding: 2rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--surface);
          border-radius: 16px;
          padding: 1.75rem;
          border: 1px solid var(--border);
          transition: all 0.3s;
          animation: slideUp 0.5s ease-out;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .stat-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--accent), var(--accent-dark));
          color: white;
        }

        .stat-more {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .stat-more:hover {
          background: var(--bg);
          color: var(--text-primary);
        }

        .stat-body {
          animation: fadeIn 0.6s ease-out 0.1s both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .stat-title {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .stat-change {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
        }

        .stat-change.positive {
          color: var(--success);
        }

        .stat-change.negative {
          color: var(--danger);
        }

        /* Charts Section */
        .charts-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .chart-card {
          background: var(--surface);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid var(--border);
          animation: slideUp 0.5s ease-out 0.2s both;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .chart-title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .chart-tabs {
          display: flex;
          gap: 0.5rem;
          background: var(--bg);
          padding: 0.25rem;
          border-radius: 10px;
        }

        .chart-tab {
          padding: 0.5rem 1rem;
          border: none;
          background: none;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--text-secondary);
          font-family: 'Urbanist', sans-serif;
        }

        .chart-tab.active {
          background: var(--surface);
          color: var(--accent);
          box-shadow: var(--shadow-sm);
        }

        /* Tables */
        .table-card {
          background: var(--surface);
          border-radius: 16px;
          border: 1px solid var(--border);
          overflow: hidden;
          animation: slideUp 0.5s ease-out 0.3s both;
        }

        .table-header {
          padding: 1.75rem 2rem;
          border-bottom: 1px solid var(--border);
        }

        .table-title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 1rem 2rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }

        td {
          padding: 1.25rem 2rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.9rem;
        }

        tr:last-child td {
          border-bottom: none;
        }

        tr {
          transition: background 0.2s;
        }

        tbody tr:hover {
          background: var(--bg);
        }

        .order-id {
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          color: var(--accent);
        }

        .status-badge {
          display: inline-block;
          padding: 0.375rem 0.875rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-badge.completed {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
        }

        .status-badge.processing {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning);
        }

        .status-badge.pending {
          background: rgba(100, 116, 139, 0.1);
          color: var(--text-secondary);
        }

        .product-name {
          font-weight: 600;
        }

        .product-trend {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
        }

        .product-trend.positive {
          color: var(--success);
        }

        .product-trend.negative {
          color: var(--danger);
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
          }

          .main-content {
            margin-left: 0;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .search-box {
            width: 250px;
          }

          .content {
            padding: 1rem;
          }
        }
      `}</style>

      {/* Sidebar */}
      <aside className={`sidebar ${!sidebarOpen ? 'closed' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-title">Nexus</div>
          <div className="brand-subtitle">Dashboard</div>
        </div>

        <div className="nav-section">
          <div className="nav-label">Main</div>
          <div className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <TrendingUp size={20} />
            Overview
          </div>
          <div className="nav-item">
            <ShoppingCart size={20} />
            Orders
          </div>
          <div className="nav-item">
            <Users size={20} />
            Customers
          </div>
          <div className="nav-item">
            <DollarSign size={20} />
            Revenue
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-label">Management</div>
          <div className="nav-item">
            Products
          </div>
          <div className="nav-item">
            Analytics
          </div>
          <div className="nav-item">
            Settings
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="header-left">
              <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="search-box">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search orders, customers, products..."
                />
              </div>
            </div>
            <div className="header-right">
              <button className="icon-button">
                <Bell size={20} />
                <span className="badge"></span>
              </button>
              <div className="user-avatar">AJ</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="content">
          <div className="page-header">
            <h1 className="page-title">Dashboard Overview</h1>
            <p className="page-subtitle">Welcome back! Here's what's happening with your business today.</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <StatCard 
              icon={DollarSign}
              title="Total Revenue"
              value="$45,231"
              change="+20.1%"
              changeType="positive"
            />
            <StatCard 
              icon={Users}
              title="Active Users"
              value="2,845"
              change="+15.3%"
              changeType="positive"
            />
            <StatCard 
              icon={ShoppingCart}
              title="Total Orders"
              value="1,046"
              change="+12.5%"
              changeType="positive"
            />
            <StatCard 
              icon={TrendingUp}
              title="Growth Rate"
              value="23.5%"
              change="-2.4%"
              changeType="negative"
            />
          </div>

          {/* Charts */}
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Revenue Overview</h3>
                <div className="chart-tabs">
                  <button className="chart-tab active">6 Months</button>
                  <button className="chart-tab">1 Year</button>
                  <button className="chart-tab">All Time</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#94A3B8" style={{ fontSize: '0.85rem' }} />
                  <YAxis stroke="#94A3B8" style={{ fontSize: '0.85rem' }} />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#FFF', 
                      border: '1px solid '#E2E8F0',
                      borderRadius: '12px',
                      padding: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Orders</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#94A3B8" style={{ fontSize: '0.85rem' }} />
                  <YAxis stroke="#94A3B8" style={{ fontSize: '0.85rem' }} />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#FFF', 
                      border: '1px solid '#E2E8F0',
                      borderRadius: '12px',
                      padding: '12px'
                    }}
                  />
                  <Bar dataKey="orders" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tables */}
          <div className="charts-grid">
            <div className="table-card">
              <div className="table-header">
                <h3 className="table-title">Recent Orders</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td>{order.customer}</td>
                      <td style={{ fontWeight: 700 }}>{order.amount}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-card">
              <div className="table-header">
                <h3 className="table-title">Top Products</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.name}>
                      <td className="product-name">{product.name}</td>
                      <td>{product.sales.toLocaleString()}</td>
                      <td style={{ fontWeight: 700 }}>{product.revenue}</td>
                      <td>
                        <span className={`product-trend ${product.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                          {product.trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}