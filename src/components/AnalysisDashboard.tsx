import React from 'react';
import { 
  Briefcase, 
  Target, 
  BookOpen, 
  MessageSquare, 
  ChevronRight, 
  ExternalLink,
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CareerAnalysis, Skill } from '@/types';
import { motion } from 'motion/react';

interface AnalysisDashboardProps {
  analysis: CareerAnalysis;
  onReset: () => void;
}

export function AnalysisDashboard({ analysis, onReset }: AnalysisDashboardProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            Analysis Results
          </h2>
          <p className="text-slate-500">Personalized career insights based on your profile.</p>
        </div>
        <button 
          onClick={onReset}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Upload another resume
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary & Suggested Roles */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div variants={item} initial="hidden" animate="show">
            <Card className="bg-blue-600 text-white border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Profile Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-50 leading-relaxed text-sm">
                  {analysis.summary}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} initial="hidden" animate="show">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Suggested Roles
                </CardTitle>
                <CardDescription>Roles that match your current profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysis.suggestedRoles.map((role, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="font-medium text-slate-700">{role}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column: Tabs for Detailed Analysis */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Roadmap
              </TabsTrigger>
              <TabsTrigger value="interview" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Interview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="space-y-8">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    Current Strengths
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {analysis.currentSkills.map((skill, i) => (
                      <div key={i}>
                        <SkillCard skill={skill} type="current" />
                      </div>
                    ))}
                  </div>
                </section>

                <Separator />

                <section className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <AlertCircleIcon className="h-5 w-5 text-amber-600" />
                    Skill Gaps
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {analysis.missingSkills.map((skill, i) => (
                      <div key={i}>
                        <SkillCard skill={skill} type="missing" />
                      </div>
                    ))}
                  </div>
                </section>
              </motion.div>
            </TabsContent>

            <TabsContent value="roadmap">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                  {analysis.roadmap.map((step, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-600 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        {i + 1}
                      </div>
                      <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-slate-900">{step.title}</h4>
                          <Badge variant="outline" className="text-[10px]">{step.duration}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">{step.description}</p>
                        <div className="space-y-2">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Recommended Resources</p>
                          <div className="flex flex-wrap gap-2">
                            {step.resources.map((res, j) => (
                              <a 
                                key={j} 
                                href="#" 
                                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                              >
                                {res} <ExternalLink className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="interview">
              <div className="space-y-6">
                {analysis.interviewQuestions.map((q, i) => (
                  <motion.div key={i} variants={item} initial="hidden" animate="show">
                    <Card className="overflow-hidden border-l-4 border-l-blue-600">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-[10px]">{q.category}</Badge>
                          <span className="text-xs text-slate-400 font-mono">Q{i + 1}</span>
                        </div>
                        <CardTitle className="text-base leading-snug">{q.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Expert Tip</p>
                          <p className="text-sm text-slate-700 italic">"{q.answerHint}"</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function SkillCard({ skill, type }: { skill: Skill, type: 'current' | 'missing' }) {
  const levelMap = {
    'Beginner': 33,
    'Intermediate': 66,
    'Advanced': 100
  };

  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold text-slate-900">{skill.name}</h4>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">{skill.category}</p>
        </div>
        <Badge 
          variant={type === 'current' ? 'default' : 'secondary'} 
          className={`text-[10px] ${type === 'current' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'}`}
        >
          {skill.level}
        </Badge>
      </div>
      <Progress value={levelMap[skill.level]} className="h-1.5" />
    </div>
  );
}

function AlertCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
