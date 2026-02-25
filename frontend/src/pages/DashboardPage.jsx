import { useEffect, useState } from 'react';
import Card from '../components/Card';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

function DashboardPage() {
  const [data, setData] = useState(null);
  const [newWeight, setNewWeight] = useState('');
  const [error, setError] = useState('');
  const { logout } = useAuth();

  const load = async () => {
    try {
      setError('');
      const res = await api.get('/users/dashboard');
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load dashboard');
    }
  };

  useEffect(() => { load(); }, []);

  const startSubscription = async () => {
    const { data: session } = await api.post('/subscription/create-checkout-session');
    window.location.href = session.url;
  };

  const updateWeight = async () => {
    await api.patch('/users/weight', { weight: Number(newWeight) });
    setNewWeight('');
    load();
  };

  if (!data) return <div className="p-6">{error || 'Loading...'}</div>;

  return (
    <div className="min-h-screen p-5">
      <div className="mb-4 flex justify-between"><h1 className="text-3xl font-bold text-neon">Dashboard</h1><button onClick={logout}>Logout</button></div>
      {data.subscriptionStatus === 'inactive' && <div className="mb-4 rounded border border-yellow-500 bg-yellow-900/20 p-4">Subscription required to access full dashboard. <button className="ml-2 rounded bg-neon px-3 py-1 font-semibold text-black" onClick={startSubscription}>Start R$19.90/month</button></div>}
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Body Metrics">
          <p>BMI: {data.bmi}</p>
          <p>Current Weight: {data.weight} kg</p>
          <div className="mt-3 flex gap-2"><input className="rounded bg-slate-800 p-2" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} placeholder="New weight" /><button className="rounded bg-neon px-3 text-black" onClick={updateWeight}>Update</button></div>
        </Card>
        <Card title="Sleep Schedule">
          <p>Sleep: {data.sleepSchedule?.recommendedSleepHours}h</p>
          <p>Bedtime: {data.sleepSchedule?.bedtime}</p>
          <p>Meal Window: {data.sleepSchedule?.mealWindow}</p>
        </Card>
        <Card title="Diet Plan">
          <p>Calories: {data.dietPlan?.targetCalories}</p>
          <ul className="mt-2 text-sm">{data.dietPlan?.meals?.map((meal) => <li key={meal.time}>{meal.time} - {meal.meal}</li>)}</ul>
        </Card>
        <Card title="Workout Plan">
          <p>{data.workoutPlan?.split}</p>
          <ul className="mt-2 text-sm">{data.workoutPlan?.days?.map((day) => <li key={day.day}>{day.day}: {day.focus}</li>)}</ul>
        </Card>
      </div>
      {error && <p className="mt-3 text-red-400">{error}</p>}
    </div>
  );
}

export default DashboardPage;
