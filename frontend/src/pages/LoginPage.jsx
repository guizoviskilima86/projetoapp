import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="mb-6 text-3xl font-bold text-neon">FitPro Login</h1>
        <input className="mb-3 w-full rounded bg-slate-800 p-3" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="mb-3 w-full rounded bg-slate-800 p-3" placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="mb-3 text-red-400">{error}</p>}
        <button className="w-full rounded bg-neon py-3 font-bold text-black">Login</button>
        <p className="mt-3 text-sm text-slate-400">No account? <Link className="text-neon" to="/register">Register</Link></p>
      </form>
    </div>
  );
}

export default LoginPage;
