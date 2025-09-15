'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TrendingUp, TrendingDown, Check, Calendar, ChevronRight, Lock, Unlock, ArrowLeft, Heart, Share, Bookmark } from 'lucide-react';

// Enhanced Input Component - Cleaner Design
const EnhancedInput = ({ 
  type, 
  value, 
  onChange, 
  maxLength = 200 
}: {
  type: 'peak' | 'pit';
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const config = {
    peak: {
      icon: TrendingUp,
      color: '#10b981',
      title: "Today's Peak",
      placeholder: "What was the best part of your day?",
    },
    pit: {
      icon: TrendingDown,
      color: '#ef4444',
      title: "Today's Pit",
      placeholder: "What was the most challenging part of your day?",
    }
  };

  const currentConfig = config[type];
  const Icon = currentConfig.icon;
  const isNearLimit = value.length > maxLength * 0.8;

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-xl mr-3 ${type === 'peak' ? 'bg-emerald-50' : 'bg-red-50'}`}>
          <Icon size={20} color={currentConfig.color} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {currentConfig.title}
        </h3>
      </div>
      
      <div className={`
        relative transition-all duration-200 rounded-2xl bg-white border-2
        ${isFocused 
          ? 'border-gray-900 shadow-lg shadow-gray-900/5' 
          : 'border-gray-100 hover:border-gray-200'
        }
      `}>
        <textarea
          className="w-full p-6 bg-transparent rounded-2xl resize-none min-h-[120px] text-gray-900 placeholder-gray-400 border-0 focus:outline-none text-base leading-relaxed"
          placeholder={currentConfig.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
        />
      </div>
      
      <div className="flex justify-between items-center mt-3 px-2">
        <span className={`text-sm font-medium transition-all duration-200 ${
          isFocused ? 'opacity-100 text-gray-600' : 'opacity-0'
        }`}>
          {isFocused ? 'Express yourself freely...' : ''}
        </span>
        <span className={`text-sm font-semibold ${
          isNearLimit ? 'text-red-500' : 'text-gray-400'
        }`}>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
};

// Enhanced Submit Button - Modern Design
const EnhancedSubmitButton = ({ 
  onSubmit, 
  isLoading, 
  peakLength, 
  pitLength 
}: {
  onSubmit: () => void;
  isLoading: boolean;
  peakLength: number;
  pitLength: number;
}) => {
  const isFormValid = peakLength > 0 && pitLength > 0;
  const completionPercentage = ((peakLength > 0 ? 50 : 0) + (pitLength > 0 ? 50 : 0));

  const getButtonText = () => {
    if (isLoading) return 'Saving your memories...';
    if (!isFormValid) return 'Complete both fields to continue';
    return 'Save entry';
  };

  return (
    <div className="mt-8">
      {/* Progress Indicator */}
      <div className="h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gray-900 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={!isFormValid || isLoading}
        className={`
          w-full py-4 px-6 rounded-2xl font-semibold text-base transition-all duration-200
          flex items-center justify-center space-x-2
          ${isFormValid 
            ? 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/15 hover:-translate-y-0.5' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }
          ${isLoading ? 'animate-pulse' : ''}
        `}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
        {isFormValid && !isLoading && <Lock size={16} />}
        <span>{getButtonText()}</span>
      </button>

      <p className="text-center text-gray-500 mt-6 text-sm leading-relaxed max-w-sm mx-auto">
        {isFormValid 
          ? "Your entry will be sealed for one year, then revealed as a memory to reflect on your journey."
          : "Share both a peak and pit to capture the full spectrum of your day."
        }
      </p>
    </div>
  );
};

// Main App Component - Modern Design
export default function PeaksAndPitsApp() {
  const [activeTab, setActiveTab] = useState('today');
  const [peak, setPeak] = useState('');
  const [pit, setPit] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!peak.trim() || !pit.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setHasSubmitted(true);
      setPeak('');
      setPit('');
    }, 2000);
  }, [peak, pit]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="text-center py-8 px-6">
          <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center border-2 border-gray-100 shadow-sm">
            <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M2 12 L8 12 L12 4 L16 12 L20 12 L24 20 L28 12 L34 12" 
                stroke="#111827" 
                strokeWidth="2.5" 
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Peaks & Pits</h1>
          <p className="text-gray-500 text-sm">{today}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex">
          {[
            { id: 'today', label: 'Today', icon: TrendingUp },
            { id: 'timeline', label: 'Timeline', icon: Calendar }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 py-4 px-6 flex items-center justify-center space-x-2 font-semibold transition-all duration-200 border-b-2 ${
                activeTab === id 
                  ? 'text-gray-900 border-gray-900' 
                  : 'text-gray-500 hover:text-gray-700 border-transparent'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'today' && (
          <div>
            {hasSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3">
                  Entry saved successfully
                </h3>
                <p className="text-emerald-700 leading-relaxed">
                  Your peak and pit have been recorded. They will unlock on{' '}
                  {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-10">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">How was your day?</h2>
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                    Capture both the highs and lows of your day. These moments will be revealed to you in exactly one year.
                  </p>
                </div>

                <EnhancedInput
                  type="peak"
                  value={peak}
                  onChange={setPeak}
                />

                <EnhancedInput
                  type="pit"
                  value={pit}
                  onChange={setPit}
                />

                <EnhancedSubmitButton
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  peakLength={peak.length}
                  pitLength={pit.length}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your timeline</h2>
              <p className="text-gray-500 text-sm">
                Entries unlock exactly one year after they were written
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <p className="text-blue-800 text-sm text-center leading-relaxed">
                Your timeline will appear here as you create more entries. Memories unlock after exactly one year.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}