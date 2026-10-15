'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiRefreshCw, FiMail, FiArrowLeft, FiShield } from 'react-icons/fi';
import { BsCheckCircleFill, BsShieldLockFill } from 'react-icons/bs';
import { HiArrowRight } from 'react-icons/hi2';
import { setAuthSession } from '@/lib/storage';
import {
  REGISTERED_ADMIN_EMAIL,
  loginWithCode,
  requestResetEmail,
  submitResetNewCode,
} from '@/lib/adminAuth';

interface OtpLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  redirectUrl?: string;
}

export const OtpLoginModal: React.FC<OtpLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  redirectUrl = '/dashboard',
}) => {
  const router = useRouter();

  // Mode: 'login' | 'forgot' | 'reset' | 'success'
  const [mode, setMode] = useState<'login' | 'forgot' | 'reset' | 'success'>('login');

  // 6-digit Code input
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);

  // Reset flow
  const [resetEmail, setResetEmail] = useState(REGISTERED_ADMIN_EMAIL);
  const [emailCodeDigits, setEmailCodeDigits] = useState(['', '', '', '', '', '']);
  const [newCodeDigits, setNewCodeDigits] = useState(['', '', '', '', '', '']);
  const [confirmCodeDigits, setConfirmCodeDigits] = useState(['', '', '', '', '', '']);

  // UI state
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const codeInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const emailCodeInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      setCodeDigits(['', '', '', '', '', '']);
      setEmailCodeDigits(['', '', '', '', '', '']);
      setNewCodeDigits(['', '', '', '', '', '']);
      setConfirmCodeDigits(['', '', '', '', '', '']);
      setError('');
      setStatusMessage(null);
      setMode('login');
      setTimeout(() => {
        codeInputsRef.current[0]?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 1. Handle Digit Change for Login Passcode
  const handleDigitChange = (index: number, val: string) => {
    // Handle paste
    if (val.length > 1) {
      const pasted = val.replace(/\D/g, '').slice(0, 6).split('');
      const newDigits = [...codeDigits];
      pasted.forEach((d, i) => {
        newDigits[i] = d;
      });
      setCodeDigits(newDigits);
      const nextIdx = Math.min(pasted.length, 5);
      codeInputsRef.current[nextIdx]?.focus();

      if (newDigits.every((d) => d !== '')) {
        handleCodeSubmit(newDigits.join(''));
      }
      return;
    }

    const clean = val.replace(/\D/g, '');
    const newDigits = [...codeDigits];
    newDigits[index] = clean;
    setCodeDigits(newDigits);
    setError('');

    if (clean && index < 5) {
      codeInputsRef.current[index + 1]?.focus();
    }

    // Auto submit if all 6 digits entered
    if (clean && index === 5 && newDigits.every((d) => d !== '')) {
      handleCodeSubmit(newDigits.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      codeInputsRef.current[index - 1]?.focus();
    }
  };

  // 2. Submit 6-digit Code
  const handleCodeSubmit = async (codeToVerify?: string) => {
    const fullCode = codeToVerify || codeDigits.join('');

    if (fullCode.length < 6) {
      setError('Please enter all 6 digits of the Admin Code.');
      return;
    }

    setError('');
    setIsLoading(true);

    const result = await loginWithCode(fullCode);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error || 'Invalid 6-digit Admin Code.');
      return;
    }

    setMode('success');
    setAuthSession({
      isLoggedIn: true,
      phoneOrEmail: REGISTERED_ADMIN_EMAIL,
      name: 'Admin',
      role: 'Admin',
      loginTime: new Date().toISOString(),
    });

    setTimeout(() => {
      onClose();
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirectUrl);
      }
    }, 700);
  };

  // 3. Request Reset Code via Email
  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setStatusMessage(null);

    const result = await requestResetEmail(resetEmail);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error || 'Failed to dispatch reset email.');
      return;
    }

    setMode('reset');
    setStatusMessage(result.message || 'Verification code dispatched to your email.');
    setTimeout(() => {
      emailCodeInputsRef.current[0]?.focus();
    }, 150);
  };

  // 4. Submit New Code & Verification
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const resetCode = emailCodeDigits.join('');
    const newCode = newCodeDigits.join('');
    const confirmCode = confirmCodeDigits.join('');

    if (resetCode.length < 6) {
      setError('Please enter the 6-digit verification code received on your email.');
      return;
    }

    if (newCode.length < 6) {
      setError('New Admin Code must be exactly 6 digits.');
      return;
    }

    if (newCode !== confirmCode) {
      setError('New 6-digit codes do not match. Please verify.');
      return;
    }

    setIsLoading(true);

    const result = await submitResetNewCode(resetEmail, resetCode, newCode);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error || 'Invalid verification code or reset failed.');
      return;
    }

    setMode('success');
    setAuthSession({
      isLoggedIn: true,
      phoneOrEmail: REGISTERED_ADMIN_EMAIL,
      name: 'Admin',
      role: 'Admin',
      loginTime: new Date().toISOString(),
    });

    setTimeout(() => {
      onClose();
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirectUrl);
      }
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="otp-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            key="otp-modal-card"
            initial={{ opacity: 0, scale: 0.85, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20, transition: { duration: 0.22, ease: 'easeIn' } }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 260,
              mass: 0.85,
            }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Luxury Green Header Banner */}
        <div className="bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#0f766e] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1.5 transition cursor-pointer"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-emerald-100 mb-2 border border-white/10">
            <BsShieldLockFill className="w-3.5 h-3.5 text-amber-300" />
            <span>Admin Security Access</span>
          </div>

          <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
            {mode === 'login' && 'Admin Passcode'}
            {mode === 'forgot' && 'Reset Admin Code'}
            {mode === 'reset' && 'Set New 6-Digit Code'}
            {mode === 'success' && 'Access Granted!'}
          </h2>

          <p className="text-emerald-100 text-xs mt-1">
            {mode === 'login' && 'Enter your confidential 6-digit security code to unlock.'}
            {mode === 'forgot' && 'Send a verification code to registered email.'}
            {mode === 'reset' && 'Enter email code and choose your new 6-digit passcode.'}
            {mode === 'success' && 'Redirecting to Admin Dashboard...'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          {statusMessage && (
            <div className="mb-4 text-xs text-emerald-900 bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 rounded-xl">
              {statusMessage}
            </div>
          )}

          {/* ===================== 1. LOGIN WITH 6-DIGIT CODE ===================== */}
          {mode === 'login' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-200 shadow-2xs">
                  <FiShield className="w-6 h-6" />
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  Enter 6-Digit Security Code
                </p>
              </div>

              {/* 6 Large Digit Boxes */}
              <div className="flex justify-between gap-2">
                {codeDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      codeInputsRef.current[index] = el;
                    }}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-black rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-white text-gray-900 shadow-xs transition"
                  />
                ))}
              </div>

              {error && (
                <div className="text-xs text-rose-700 font-medium bg-rose-50 border border-rose-200 px-3.5 py-2.5 rounded-xl text-center">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={() => handleCodeSubmit()}
                disabled={isLoading || codeDigits.some((d) => d === '')}
                className="w-full bg-[#064e3b] hover:bg-[#047857] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <FiRefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Unlock Admin Panel</span>
                    <HiArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-1 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setStatusMessage(null);
                    setMode('forgot');
                  }}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
                >
                  Forgot 6-Digit Code? Reset via Email
                </button>
              </div>
            </div>
          )}

          {/* ===================== 2. FORGOT CODE (EMAIL REQUEST) ===================== */}
          {mode === 'forgot' && (
            <form onSubmit={handleSendResetEmail} className="space-y-4">
              <div className="text-center pb-2">
                <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-2 border border-amber-200">
                  <FiMail className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  Reset 6-Digit Passcode
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  A verification code will be dispatched to your registered email to set a new 6-digit code.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiMail className="w-4 h-4 text-emerald-700" />
                  </div>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-gray-50/50"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-xs text-rose-700 font-medium bg-rose-50 border border-rose-200 px-3.5 py-2.5 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#064e3b] hover:bg-[#047857] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <FiRefreshCw className="w-4 h-4 animate-spin" />
                    <span>Dispatching Verification Code...</span>
                  </>
                ) : (
                  <>
                    <FiMail className="w-4 h-4" />
                    <span>Send Verification Code to Email</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setError('');
                  setMode('login');
                }}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 py-2 transition cursor-pointer"
              >
                <FiArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Passcode Screen</span>
              </button>
            </form>
          )}

          {/* ===================== 3. SET NEW 6-DIGIT CODE ===================== */}
          {mode === 'reset' && (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Enter verification code sent to your email:
                </p>
                <p className="text-xs font-bold text-emerald-800 mt-0.5">
                  Check inbox and spam folder of {resetEmail}
                </p>
              </div>

              {/* Email Verification Code */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  6-Digit Email Verification Code
                </label>
                <div className="flex justify-between gap-2">
                  {emailCodeDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        emailCodeInputsRef.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/\D/g, '');
                        const newD = [...emailCodeDigits];
                        newD[index] = clean;
                        setEmailCodeDigits(newD);
                        if (clean && index < 5) emailCodeInputsRef.current[index + 1]?.focus();
                      }}
                      className="w-12 h-12 text-center text-xl font-bold rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-white text-gray-900 shadow-2xs"
                      required
                    />
                  ))}
                </div>
              </div>

              {/* New 6-Digit Code */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Enter New 6-Digit Admin Code
                </label>
                <div className="flex justify-between gap-2">
                  {newCodeDigits.map((digit, index) => (
                    <input
                      key={index}
                      type="password"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/\D/g, '');
                        const newD = [...newCodeDigits];
                        newD[index] = clean;
                        setNewCodeDigits(newD);
                      }}
                      className="w-12 h-12 text-center text-xl font-bold rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-white text-gray-900 shadow-2xs"
                      required
                    />
                  ))}
                </div>
              </div>

              {/* Confirm New 6-Digit Code */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Confirm New 6-Digit Admin Code
                </label>
                <div className="flex justify-between gap-2">
                  {confirmCodeDigits.map((digit, index) => (
                    <input
                      key={index}
                      type="password"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/\D/g, '');
                        const newD = [...confirmCodeDigits];
                        newD[index] = clean;
                        setConfirmCodeDigits(newD);
                      }}
                      className="w-12 h-12 text-center text-xl font-bold rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-white text-gray-900 shadow-2xs"
                      required
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="text-xs text-rose-700 font-medium bg-rose-50 border border-rose-200 px-3.5 py-2.5 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#064e3b] hover:bg-[#047857] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <FiRefreshCw className="w-4 h-4 animate-spin" />
                    <span>Updating Code...</span>
                  </>
                ) : (
                  <span>Set New Code &amp; Unlock</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setError('');
                  setMode('login');
                }}
                className="w-full text-center text-xs font-bold text-gray-600 hover:text-gray-900 py-1 transition cursor-pointer"
              >
                Cancel
              </button>
            </form>
          )}

          {/* ===================== 4. SUCCESS ===================== */}
          {mode === 'success' && (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <BsCheckCircleFill className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Code Verified!
              </h3>
              <p className="text-xs text-gray-500">
                Admin unlocked. Redirecting to Dashboard...
              </p>
            </div>
          )}
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
