import { useEffect, useState } from 'react';
import api from '../services/api';

function AdminPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/admin').then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="p-5">Loading admin data...</div>;

  return (
    <div className="p-5">
      <h1 className="mb-5 text-3xl font-bold text-neon">Admin</h1>
      <div className="mb-4 flex gap-4">
        <div>Total users: {data.totalUsers}</div>
        <div>Estimated revenue: R${data.estimatedMonthlyRevenue.toFixed(2)}</div>
      </div>
      <div className="overflow-auto">
        <table className="w-full border border-slate-800 text-left text-sm">
          <thead className="bg-slate-900"><tr><th className="p-2">Name</th><th>Email</th><th>Level</th><th>Subscription</th></tr></thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user._id} className="border-t border-slate-800">
                <td className="p-2">{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.level}</td>
                <td>{user.subscriptionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
