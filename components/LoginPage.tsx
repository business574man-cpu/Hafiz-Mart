import React, { useState } from 'react';

interface AuthPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string) => void;
  message?: string;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onSignup, message }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
        if (isLogin) {
            onLogin(email, password);
        } else {
            // Client-side validation for signup
            if (!/\S+@\S+\.\S+/.test(email)) {
                setError('Please enter a valid email address.');
                return;
            }
            if (password.length < 6) {
                setError('Password must be at least 6 characters long.');
                return;
            }
            onSignup(email, password);
        }
    } catch (err: any) {
        setError(err.message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-100 animate-fade-in">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <p className="text-center text-gray-500">Welcome to Hafiz Mart</p>
        
        {message && <p className="text-sm text-center font-semibold text-blue-600 bg-blue-50 p-3 rounded-md">{message}</p>}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password"  className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          {error && <p className="text-sm text-center text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-primary rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </div>
        </form>
        <div className="text-center">
            <button onClick={toggleForm} className="text-sm font-medium text-primary hover:underline">
                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </button>
        </div>
        <div className="text-center">
            <a href="#" className="text-xs text-gray-500 hover:underline">
                Forgot Password?
            </a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;