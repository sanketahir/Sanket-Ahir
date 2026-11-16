import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, X } from 'lucide-react';

interface FlutterSnackBarProps {
  message: string | null;
  onClose: () => void;
  actionText?: string;
  onAction?: () => void;
  duration?: number;
}

export const FlutterSnackBar: React.FC<FlutterSnackBarProps> = ({
  message,
  onClose,
  actionText,
  onAction,
  duration = 3000
}) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90vw] md:max-w-md px-4"
        >
          <div className="bg-[#323232] text-white shadow-2xl rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-sm border border-neutral-700/60 font-medium">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>{message}</span>
            </div>
            <div className="flex items-center gap-2">
              {actionText && (
                <button
                  type="button"
                  onClick={onAction || onClose}
                  className="text-blue-400 font-bold uppercase text-xs tracking-wider hover:text-blue-300 px-2 py-1"
                >
                  {actionText}
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-colors p-1"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
