import React, { useState } from 'react';
import { ResumeUploader } from './components/ResumeUploader';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { CareerAnalysis } from './types';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

export default function App() {
  const [analysis, setAnalysis] = useState<CareerAnalysis | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-[120px] opacity-50" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-indigo-50 blur-[100px] opacity-40" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setAnalysis(null)}>
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Career<span className="text-blue-600">Nav</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900">Log in</button>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 sm:py-20">
        <AnimatePresence mode="wait">
          {!analysis ? (
            <motion.div
              key="uploader"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ResumeUploader onAnalysisComplete={setAnalysis} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <AnalysisDashboard 
                analysis={analysis} 
                onReset={() => setAnalysis(null)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span className="font-bold text-xl tracking-tight">CareerNav</span>
              </div>
              <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
                Empowering professionals with AI-driven career guidance. 
                Our mission is to bridge the gap between where you are and where you want to be.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Github className="h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                <Twitter className="h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                <Linkedin className="h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-900">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600">Resume Analysis</a></li>
                <li><a href="#" className="hover:text-blue-600">Skill Roadmaps</a></li>
                <li><a href="#" className="hover:text-blue-600">Interview Prep</a></li>
                <li><a href="#" className="hover:text-blue-600">Job Matching</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-900">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">© 2024 CareerNav AI. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs text-slate-400">
              <a href="#" className="hover:text-slate-600">Status</a>
              <a href="#" className="hover:text-slate-600">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
