import React from 'react';
import { Shield, Globe, Users, Code, Lock, Scale } from 'lucide-react';

export default function PremiumRulesPage() {
  const rules = [
    {
      id: "01",
      icon: <Globe className="w-5 h-5" />,
      title: "Global Eligibility & Professional Participation",
      blueprint: "Galuxium Nexus V2 is an enterprise-grade innovation marathon. Participation is fully and explicitly open to professional engineers, established SaaS founders, senior developers, and builders of all ages globally.",
      constraintLabel: "The Constraint",
      constraint: "There are zero occupational or corporate restrictions. Independent engineers, full corporate teams, and professional organizations are explicitly authorized and encouraged to compete. (Note: Any automated platform tags indicating 'students only' or 'companies excluded' are static legacy artifacts and are officially overridden by this operational mandate)."
    },
    {
      id: "02",
      icon: <Users className="w-5 h-5" />,
      title: "Team Formations & Cohesion",
      blueprint: "Builders are permitted to compete either as elite individual founders or in collaborative teams.",
      constraintLabel: "The Constraint",
      constraint: "To preserve a balanced ecosystem, team sizes are strictly capped. All members must be registered via the official Galuxium submission portal prior to the commencement of the evaluation phase."
    },
    {
      id: "03",
      icon: <Code className="w-5 h-5" />,
      title: "Intellectual Integrity & Code Provenance",
      blueprint: "Every project submitted must represent entirely original work conceived, engineered, and executed within the official hackathon window.",
      constraintLabel: "The Constraint",
      constraint: "Utilizing third-party open-source libraries, UI components, boilerplate frameworks, or public APIs is fully permitted. However, copy-pasting, cloning, or plagiarizing existing commercial products, pre-built proprietary software, or prior project submissions is strictly prohibited."
    },
    {
      id: "04",
      icon: <Lock className="w-5 h-5" />,
      title: "IP Ownership & Showcase Mandate",
      blueprint: "Participants retain 100% intellectual property ownership of the codebases, designs, and business models they architect during the event.",
      constraintLabel: "The Showcase",
      constraint: "By submitting a project portfolio, teams grant Galuxium a non-exclusive, global license to feature, document, and showcase their platforms across official websites, investor pitches, and media channels for ecosystem promotion and talent profiling."
    },
    {
      id: "05",
      icon: <Scale className="w-5 h-5" />,
      title: "Digital Conduct & Platform Integrity",
      blueprint: "The entire lifecycle of the event is governed by official Galuxium Nexus V2 operational guidelines.",
      constraintLabel: "The Constraint",
      constraint: "Galuxium enforces a zero-tolerance policy for misconduct. Any verified instances of plagiarism, code-faking, harassment, or malicious behavior targeted at fellow builders, mentors, or judges will trigger immediate, permanent disqualification and a ban from future iterations."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white antialiased">
      {/* Ultra-minimalist Header */}
      <header className="w-full border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-24 flex items-center justify-between">
          <span className="font-bold text-2xl tracking-tighter">Galuxium</span>
          <span className="text-xs font-medium tracking-widest text-slate-400 uppercase">Nexus V2</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        {/* Header Section */}
        <div className="mb-24 max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-6 h-6 text-slate-300" />
            <span className="text-sm font-semibold tracking-widest text-slate-400 uppercase">Operational Parameters</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
            Competitive Integrity & Structural Equity
          </h1>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-light">
            To maintain absolute competitive integrity, all participants must strictly adhere to the following parameters throughout the duration of Galuxium Nexus V2. Non-compliance will result in immediate disqualification without right of appeal.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="space-y-16">
          {rules.map((rule) => (
            <div key={rule.id} className="relative group">
              <div className="absolute -left-12 top-1 text-sm font-bold text-slate-200 hidden md:block select-none">
                {rule.id}
              </div>
              <div className="border-l-2 border-slate-100 pl-6 md:pl-10 group-hover:border-slate-900 transition-colors duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-900 border border-slate-100">
                    {rule.icon}
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">{rule.title}</h2>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase mb-3">The Blueprint</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {rule.blueprint}
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100">
                    <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase mb-3">{rule.constraintLabel}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {rule.constraint}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-100 mt-24">
        <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <div>© 2026 Galuxium Inc. All rights reserved.</div>
          <div className="flex gap-6 uppercase tracking-wider">
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Guidelines</span>
          </div>
        </div>
      </footer>
    </div>
  );
}