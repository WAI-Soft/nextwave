import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Loader2, Eye, EyeOff, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { translations } from '../../translations';
import nextwaveLogo from '@/assets/nextwave header.png';

const Login = () => {
  // Always use English for admin
  const t = translations.en;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple authentication check
      if (email === 'admin@nextwave.com' && password === 'admin123') {
        toast.success(t.admin.login.loginSuccess);
        navigate('/admin/dashboard');
      } else {
        setError(t.admin.login.invalidCredentials);
        toast.error(t.admin.login.invalidCredentials);
      }
    } catch (error) {
      setError(t.admin.login.invalidCredentials);
      toast.error(t.admin.login.loginFailed);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pure-black relative overflow-hidden" dir="ltr">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-champagne-gold rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-champagne-gold rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-champagne-gold rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-pure-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8 mt-8">
           {/* <div className="inline-flex items-center justify-center w-32 h-32 bg-champagne-gold rounded-2xl mb-4 shadow-2xl p-4">
              <img
                src={nextwaveLogo}
                alt="NextWave Logo"
                className="w-full h-full object-contain"
              />
            </div> */}
            <h1 className="text-4xl font-bold text-pure-white mb-2">
              NextWave
            </h1>
            <p className="text-pure-white/70 text-lg">Admin Dashboard</p>
          </div> 

          <Card className="bg-pure-black/40 backdrop-blur-xl border-champagne-gold/20 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-champagne-gold rounded-full flex items-center justify-center shadow-lg p-3">
                  <img
                    src={nextwaveLogo}
                    alt="NextWave Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-pure-white">
                {t.admin.login.welcomeBack}
              </CardTitle>
              <CardDescription className="text-pure-white/70">
                {t.admin.login.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert className="bg-red-500/20 border-red-500/50 text-red-100 rounded-xl">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-pure-white/90 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@nextwave.com"
                      className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 rounded-xl h-12 transition-all duration-300"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <Zap className="w-5 h-5 text-pure-white/40" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-pure-white/90 font-medium">
                    {t.admin.login.passwordLabel}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.admin.login.passwordPlaceholder}
                      className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 rounded-xl h-12 pr-12 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pure-white/50 hover:text-pure-white/80 transition-colors"
                      title={showPassword ? t.admin.login.hidePassword : t.admin.login.showPassword}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-champagne-gold hover:bg-champagne-gold/90 text-pure-black font-semibold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t.admin.login.loggingIn}
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      {t.admin.login.loginButton}
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 p-4 bg-pure-black/20 rounded-xl border border-champagne-gold/20 backdrop-blur-sm">
                <p className="text-sm text-pure-white/70 text-center">
                  <strong className="text-pure-white/90">Demo Credentials:</strong><br />
                  <span className="text-champagne-gold">admin@nextwave.com</span><br />
                  <span className="text-champagne-gold">admin123</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
