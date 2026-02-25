import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const goals = ['Physical Conditioning', 'Muscle Gain', 'Weight Loss', 'Bodybuilding Preparation', 'Sport Performance'];

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', height: '', weight: '', sport: '', level: 'Amateur', goal: goals[0],
    profession: '', workStart: '', workEnd: '', breakIntervals: ''
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await register({ ...form, height: Number(form.height), weight: Number(form.weight) });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-5">
      <form onSubmit={submit} className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900 p-6 md:grid-cols-2">
        <h1 className="md:col-span-2 text-3xl font-bold text-neon">Create account</h1>
        {Object.entries(form).map(([key, value]) => (
          ['level', 'goal'].includes(key) ? null :
          <input key={key} className="rounded bg-slate-800 p-3" placeholder={key} value={value} type={key.includes('password') ? 'password' : key.includes('email') ? 'email' : key.includes('work') ? 'time' : 'text'} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required={['fullName','email','password','height','weight','sport'].includes(key)} />
        ))}
        <select className="rounded bg-slate-800 p-3" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}><option>Amateur</option><option>HighPerformance</option></select>
        <select className="rounded bg-slate-800 p-3" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })}>{goals.map((goal) => <option key={goal}>{goal}</option>)}</select>
        {error && <p className="md:col-span-2 text-red-400">{error}</p>}
        <button className="md:col-span-2 rounded bg-neon py-3 font-bold text-black">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
