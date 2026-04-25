import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import SalyLeft from '../../assets/Saly-3.png';
import SalyRight from '../../assets/Saly-2.png';
import { setCredentials } from '../../store/authSlice';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('emilys'); // Pre-fill with test credentials
  const [password, setPassword] = useState('emilyspass');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60, // optional
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Dispatch to Redux and store in localStorage via slice
      dispatch(setCredentials({ user: data, token: data.token }));
      
      // Redirect to home
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
      {/* Backgrounds */}
      <div className="absolute inset-0 hidden lg:grid grid-cols-2">
        <div className="bg-bg-left relative flex items-center overflow-hidden">
          <img src={SalyLeft} alt="Illustration Left" className="w-[90%] h-auto object-contain z-0 ml-[-5%]" />
        </div>
        <div className="bg-bg-right relative flex items-center justify-end overflow-hidden">
          <img src={SalyRight} alt="Illustration Right" className="w-[90%] h-auto object-contain z-0 mr-[-5%]" />
        </div>
      </div>
      <div className="absolute inset-0 bg-bg-left lg:hidden" />

      {/* Login Card */}
      <div className="relative z-10 bg-white w-full max-w-[480px] rounded-[40px] p-8 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="space-y-2 mb-10">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium text-sm">Experience the premium</span>
            <div className="text-right text-xs">
                <span className="text-subtext">No Account ?</span>
                <button className="text-primary font-semibold hover:underline ml-1">Sign up</button>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-black tracking-tighter">Sign in</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm animate-shake">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <Input 
            label="Enter your username" 
            placeholder="Username (e.g. emilys)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="space-y-3">
            <Input 
              label="Enter your Password" 
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right">
              <button type="button" className="text-primary text-xs font-bold hover:underline">
                Forgot Password?
              </button>
            </div>
          </div>

          <Button 
            fullWidth 
            type="submit" 
            disabled={isLoading}
            className="py-5 shadow-xl hover:shadow-primary/30 transition-all font-bold text-lg rounded-2xl"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className="relative text-center py-2">
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-100" />
            <span className="relative bg-white px-4 text-subtext text-[10px] font-black uppercase tracking-widest">Or Continue with</span>
          </div>

          <div className="flex gap-4 items-center justify-center">
             <button type="button" className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-100 shadow-sm">
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
             </button>
             <button type="button" className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-100 shadow-sm">
                <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
             </button>
             <button type="button" className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-100 shadow-sm">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2.002-.156-3.312.696-4.298.696zm2.741-6.896c-1.141.052-2.531.78-3.351 1.74-.74.857-1.39 2.052-1.221 3.235 1.261.091 2.571-.65 3.351-1.611.714-.883 1.324-2.078 1.221-3.364z" /></svg>
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
