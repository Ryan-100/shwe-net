'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Zap, Shield, TrendingUp, Bot, FileText, BarChart3 } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import Loading from '@/components/shared/Loading';
import Footer from '@/components/layout/Footer';

export default function SplashUI() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initial loading animation
    const timer1 = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 1500);

    return () => {
      clearTimeout(timer1);
    };
  }, [router]);

  const handleGetStarted = () => {
    router.push('/scan');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-gray-50 to-amber-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-soft"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-soft delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Loading text={"Loading ShweNet..."} />
      )}

      {/* Main Content */}
      {showContent && (
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between animate-fade-in">
              <Logo/>
            </div>
          </header>

          {/* Hero Section */}
          <main className="flex-1 container mx-auto px-6 flex flex-col justify-center">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Title */}
              <div className="mb-8 animate-fade-in-up">
                <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
                  Your{' '}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                    Golden
                  </span>{' '}
                  Network
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 mb-2">
                  for Smarter Finance
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
              </div>

              {/* Subtitle */}
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-300">
                Transform your business finances with AI-powered document processing, 
                real-time insights, and intelligent financial advisory—all in one platform.
              </p>

              {/* Feature Icons */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up delay-500">
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-300 group-hover:scale-110">
                    <FileText className="w-8 h-8 text-amber-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Document Processing</p>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-300 group-hover:scale-110">
                    <Bot className="w-8 h-8 text-amber-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">AI Financial Advisor</p>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-300 group-hover:scale-110">
                    <BarChart3 className="w-8 h-8 text-amber-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Real-time Insights</p>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-300 group-hover:scale-110">
                    <Shield className="w-8 h-8 text-amber-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Secure & Trusted</p>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-300 group-hover:scale-110">
                    <TrendingUp className="w-8 h-8 text-amber-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Growth Analytics</p>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-300 group-hover:scale-110">
                    <Zap className="w-8 h-8 text-amber-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Lightning Fast</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="animate-fade-in-up delay-700">
                <button
                  onClick={handleGetStarted}
                  className="group inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <span>Start Uploading</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 animate-fade-in-up delay-1000">
                <p className="text-sm text-gray-600 mb-4">Trusted by SMEs worldwide</p>
                <div className="flex items-center justify-center space-x-8 opacity-60">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-medium">Enterprise Security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-medium">99.9% Uptime</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-medium">Real-time Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <Footer/>
        </div>
      )}

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 animate-bounce-soft delay-500">
        <div className="w-3 h-3 bg-amber-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-1/3 right-10 animate-bounce-soft delay-1000">
        <div className="w-2 h-2 bg-amber-500 rounded-full opacity-80"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-bounce-soft delay-1500">
        <div className="w-4 h-4 bg-amber-300 rounded-full opacity-40"></div>
      </div>
    </div>
  );
}