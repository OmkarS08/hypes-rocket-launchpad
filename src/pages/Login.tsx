
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';
import AuthLayout from '@/components/AuthLayout';
import { Eye, EyeOff, LogIn, ArrowRight, Github, Mail } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Here you would typically integrate with your authentication service
      // For now, we'll simulate a successful login after a brief delay
      setTimeout(() => {
        toast.success('Login successful! Welcome back.');
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      // In a real app, this would be in the finally block of your API call
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };
  
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your hypes.in account"
      linkText="Don't have an account? Sign up"
      linkTo="/signup"
    >
      <motion.form 
        className="space-y-6 mt-8" 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="h-12"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              to="/forgot-password" 
              className="text-sm text-hypes-green hover:text-hypes-green-dark transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="h-12 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember me for 30 days
          </Label>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full h-12 bg-hypes-green hover:bg-hypes-green-dark text-white font-medium"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : (
            <span className="flex items-center">
              <LogIn className="mr-2" size={18} />
              Log in
            </span>
          )}
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-hypes-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-hypes-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" className="h-12">
            <Github className="mr-2" size={18} />
            <span>GitHub</span>
          </Button>
          <Button variant="outline" type="button" className="h-12">
            <Mail className="mr-2" size={18} />
            <span>Google</span>
          </Button>
        </div>
      </motion.form>
    </AuthLayout>
  );
};

export default Login;
