import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { extractTextFromPDF } from '@/lib/pdf';
import { analyzeResume } from '@/lib/gemini';
import { CareerAnalysis } from '@/types';
import { motion, AnimatePresence } from 'motion/react';

interface ResumeUploaderProps {
  onAnalysisComplete: (analysis: CareerAnalysis) => void;
}

export function ResumeUploader({ onAnalysisComplete }: ResumeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const text = await extractTextFromPDF(file);
      const analysis = await analyzeResume(text, targetRole);
      onAnalysisComplete(analysis);
    } catch (err) {
      console.error(err);
      setError('Failed to process resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl"
        >
          Your AI Career <span className="text-blue-600">Navigator</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg leading-8 text-slate-600"
        >
          Upload your resume and let AI chart your path to success. 
          Get skill gap analysis, personalized roadmaps, and interview prep.
        </motion.p>
      </div>

      <Card className="border-2 border-dashed border-slate-200 bg-slate-50/50">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Target Role (Optional)</label>
              <Input 
                placeholder="e.g. Senior Frontend Engineer" 
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="bg-white"
              />
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative group cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-100'}
              `}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                accept=".pdf"
                className="hidden"
              />
              
              <div className="flex flex-col items-center gap-4">
                <div className={`p-4 rounded-full ${isDragging ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                  {isLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : (
                    <Upload className="h-8 w-8" />
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="text-lg font-medium text-slate-900">
                    {isLoading ? 'Analyzing your profile...' : 'Click or drag resume to upload'}
                  </p>
                  <p className="text-sm text-slate-500">PDF files only (max 10MB)</p>
                </div>

                {isLoading && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-1 bg-blue-600 absolute bottom-0 left-0 rounded-full"
                    transition={{ duration: 10, ease: "linear" }}
                  />
                )}
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm"
                >
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                { icon: FileText, text: 'Resume Analysis' },
                { icon: CheckCircle2, text: 'Skill Gap Check' },
                { icon: Loader2, text: 'Career Roadmap' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <item.icon className="h-4 w-4" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
