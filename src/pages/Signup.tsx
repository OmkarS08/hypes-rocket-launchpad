
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';
import AuthLayout from '@/components/AuthLayout';
import { Eye, EyeOff, UserPlus, Github, Mail, AlertCircle } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Here you would typically integrate with your authentication service
      // For now, we'll simulate a successful signup after a brief delay
      setTimeout(() => {
        toast.success('Account created successfully! Welcome to hypes.in');
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };
  
  return (
    <AuthLayout
      title="Join hypes.in"
      subtitle="Create an account to start your startup journey"
      linkText="Already have an account? Log in"
      linkTo="/login"
    >
      <motion.form 
        className="space-y-5 mt-8" 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="space-y-1">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            className={`h-12 ${errors.fullName ? 'border-red-500' : ''}`}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500 flex items-center mt-1">
              <AlertCircle size={14} className="mr-1" /> {errors.fullName}
            </p>
          )}
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 flex items-center mt-1">
              <AlertCircle size={14} className="mr-1" /> {errors.email}
            </p>
          )}
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a secure password"
              value={formData.password}
              onChange={handleChange}
              className={`h-12 pr-10 ${errors.password ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password ? (
            <p className="text-sm text-red-500 flex items-center mt-1">
              <AlertCircle size={14} className="mr-1" /> {errors.password}
            </p>
          ) : (
            <p className="text-xs text-hypes-gray-500 mt-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`h-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 flex items-center mt-1">
              <AlertCircle size={14} className="mr-1" /> {errors.confirmPassword}
            </p>
          )}
        </div>
        
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox 
            id="terms" 
            checked={agreeToTerms} 
            onCheckedChange={(checked) => setAgreeToTerms(checked === true)} 
            className={errors.terms ? 'border-red-500' : ''}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-normal leading-tight text-hypes-gray-700"
            >
              I agree to hypes.in's <a href="#" className="font-medium text-hypes-green hover:text-hypes-green-dark">Terms of Service</a> and <a href="#" className="font-medium text-hypes-green hover:text-hypes-green-dark">Privacy Policy</a>
            </label>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms}</p>
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full h-12 bg-hypes-green hover:bg-hypes-green-dark text-white font-medium mt-6"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          ) : (
            <span className="flex items-center">
              <UserPlus className="mr-2" size={18} />
              Create Account
            </span>
          )}
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-hypes-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-hypes-gray-500">Or sign up with</span>
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

export default Signup;
