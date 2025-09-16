import { useState, useEffect, FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsData {
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
  revenue: number;
}

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

const AnalyticsDashboard: FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    visitors: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    conversionRate: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  // Données simulées pour les graphiques
  const monthlyData: ChartData[] = [
    { name: 'Jan', value: 1200, color: '#3B82F6' },
    { name: 'Fév', value: 1900, color: '#3B82F6' },
    { name: 'Mar', value: 3000, color: '#3B82F6' },
    { name: 'Avr', value: 2800, color: '#3B82F6' },
    { name: 'Mai', value: 1890, color: '#3B82F6' },
    { name: 'Jun', value: 2390, color: '#3B82F6' },
    { name: 'Jul', value: 3490, color: '#3B82F6' },
  ];

  const trafficData: ChartData[] = [
    { name: 'Direct', value: 45, color: '#3B82F6' },
    { name: 'Social', value: 25, color: '#10B981' },
    { name: 'Email', value: 20, color: '#F59E0B' },
    { name: 'Referral', value: 10, color: '#EF4444' },
  ];

  const deviceData: ChartData[] = [
    { name: 'Mobile', value: 60, color: '#3B82F6' },
    { name: 'Desktop', value: 30, color: '#10B981' },
    { name: 'Tablet', value: 10, color: '#F59E0B' },
  ];

  useEffect(() => {
    // Simulation du chargement des données
    const loadAnalyticsData = async () => {
      setLoading(true);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalyticsData({
        visitors: 12543,
        pageViews: 45678,
        bounceRate: 42.5,
        avgSessionDuration: 3.2,
        conversionRate: 2.8,
        revenue: 12500,
      });
      
      setLoading(false);
    };

    loadAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Vue d'ensemble des performances de votre site</p>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Visiteurs</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.visitors.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pages vues</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.pageViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Taux de rebond</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.bounceRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Durée moyenne</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.avgSessionDuration}min</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Taux de conversion</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.conversionRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenus</p>
                <p className="text-2xl font-semibold text-gray-900">€{analyticsData.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Graphique des visites mensuelles */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Visites mensuelles</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique des sources de trafic */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources de trafic</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique des appareils */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition par appareil</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deviceData.map((device, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: device.color }}
                  >
                    {device.value}%
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">{device.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
