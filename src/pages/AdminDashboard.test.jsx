import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock recharts and lucide-react components
jest.mock('recharts', () => ({
  BarChart: ({ children }) => <div data-testid="BarChart">{children}</div>,
  Bar: () => <div data-testid="Bar" />,
  LineChart: ({ children }) => <div data-testid="LineChart">{children}</div>,
  Line: () => <div data-testid="Line" />,
  XAxis: () => <div data-testid="XAxis" />,
  YAxis: () => <div data-testid="YAxis" />,
  CartesianGrid: () => <div data-testid="CartesianGrid" />,
  Tooltip: () => <div data-testid="Tooltip" />,
  ResponsiveContainer: ({ children }) => <div data-testid="ResponsiveContainer">{children}</div>,
}));

jest.mock('lucide-react', () => ({
  Users: () => <div data-testid="UsersIcon" />,
  DollarSign: () => <div data-testid="DollarSignIcon" />,
  ShoppingCart: () => <div data-testid="ShoppingCartIcon" />,
  TrendingUp: () => <div data-testid="TrendingUpIcon" />,
  Menu: () => <div data-testid="MenuIcon" />,
  X: () => <div data-testid="XIcon" />,
  Bell: () => <div data-testid="BellIcon" />,
  Search: () => <div data-testid="SearchIcon" />,
  MoreVertical: () => <div data-testid="MoreVerticalIcon" />,
  ArrowUp: () => <div data-testid="ArrowUpIcon" />,
  ArrowDown: () => <div data-testid="ArrowDownIcon" />,
}));

describe('AdminDashboard', () => {
  // Test 1: Renders without crashing
  test('renders AdminDashboard component without crashing', () => {
    render(
      <Router>
        <AdminDashboard />
      </Router>
    );
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
  });

  // Test 2: Sidebar toggles correctly
  test('sidebar toggles open and closed', () => {
    render(
      <Router>
        <AdminDashboard />
      </Router>
    );
    const menuToggleButton = screen.getByRole('button', { name: /toggle menu/i });
    const sidebar = screen.getByRole('complementary'); // 'aside' usually has role 'complementary'

    // Initially sidebar is open
    expect(sidebar).not.toHaveClass('closed');

    fireEvent.click(menuToggleButton);
    // After click, sidebar should be closed
    expect(sidebar).toHaveClass('closed');

    fireEvent.click(menuToggleButton);
    // After second click, sidebar should be open again
    expect(sidebar).not.toHaveClass('closed');
  });

  // Test 3: Stat cards render with correct data
  test('stat cards render with correct data', () => {
    render(
      <Router>
        <AdminDashboard />
      </Router>
    );

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$45,231')).toBeInTheDocument();
    expect(screen.getByText('+20.1%')).toBeInTheDocument();

    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('2,845')).toBeInTheDocument();
    expect(screen.getByText('+15.3%')).toBeInTheDocument();

    expect(screen.getByText('Total Orders')).toBeInTheDocument();
    expect(screen.getByText('1,046')).toBeInTheDocument();
    expect(screen.getByText('+12.5%')).toBeInTheDocument();

    expect(screen.getByText('Growth Rate')).toBeInTheDocument();
    expect(screen.getByText('23.5%')).toBeInTheDocument();
    expect(screen.getByText('-2.4%')).toBeInTheDocument();
  });

  // Test 4: Charts render
  test('charts render', () => {
    render(
      <Router>
        <AdminDashboard />
      </Router>
    );
    expect(screen.getByText('Revenue Overview')).toBeInTheDocument();
    expect(screen.getByTestId('LineChart')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByTestId('BarChart')).toBeInTheDocument();
  });

  // Test 5: Recent orders table renders with correct data
  test('recent orders table renders with correct data', () => {
    render(
      <Router>
        <AdminDashboard />
      </Router>
    );
    expect(screen.getByText('Recent Orders')).toBeInTheDocument();
    expect(screen.getByText('#3492')).toBeInTheDocument();
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('$245.00')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  // Test 6: Top products table renders with correct data
  test('top products table renders with correct data', () => {
    render(
      <Router>
        <AdminDashboard />
      </Router>
    );
    expect(screen.getByText('Top Products')).toBeInTheDocument();
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('1,247')).toBeInTheDocument();
    expect(screen.getByText('$124,700')).toBeInTheDocument();
    expect(screen.getByText('+12%')).toBeInTheDocument();
  });
});