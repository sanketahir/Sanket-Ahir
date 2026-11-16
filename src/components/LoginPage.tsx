import React, { useState } from 'react';
import { UserRole } from '../types';
import { GraduationCap, User, Lock, Eye, EyeOff, Sparkles, HelpCircle, PhoneCall } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userName: string, role: UserRole) => void;
  showSnackBar: (msg: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, showSnackBar }) => {
  const [role, setRole] = useState<UserRole>('Student');
  const [userId, setUserId] = useState<string>('ASH-2024-042');
  const [password, setPassword] = useState<string>('ashadeep123');
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'Student') {
      setUserId('ASH-2024-042');
      setPassword('ashadeep123');
    } else if (newRole === 'Teacher') {
      setUserId('TCH-MAT-104');
      setPassword('teacher2024');
    } else {
      setUserId('ADM-PRIN-01');
      setPassword('admin789');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !password) {
      showSnackBar('Please enter User ID and Password');
      return;
    }

    showSnackBar(`Logged in successfully as ${role}`);
    onLogin(userId.trim(), role);
  };

  return (
    <div className="min-h-screen bg-[#F2F6FC] flex items-center justify-center p-4 sm:p-6 transition-colors selection:bg-blue-100 selection:text-blue-700">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        {/* School Logo Avatar */}
        <div className="w-24 h-24 rounded-full bg-[#1E88E5] shadow-lg shadow-blue-500/25 flex items-center justify-center text-white mb-4 transition-transform hover:scale-105">
          <GraduationCap className="w-14 h-14" strokeWidth={2.2} />
        </div>

        {/* School Brand Headings */}
        <h1 className="text-[25px] font-extrabold tracking-tight text-[#1E88E5] text-center">
          ASHADEEP SCHOOL
        </h1>
        <p className="text-neutral-500 text-sm mt-0.5 mb-7 font-medium">
          Welcome to School App
        </p>

        {/* Quick Demo Credentials Pill Bar */}
        <div className="w-full mb-3 flex items-center justify-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-neutral-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Demo:
          </span>
          {(['Student', 'Teacher', 'Admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRoleChange(r)}
              className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                role === r
                  ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-600'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Login Box (Container matching Flutter BoxDecoration) */}
        <div className="w-full bg-white rounded-[22px] p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-neutral-100">
          <h2 className="text-[22px] font-bold text-center text-neutral-800 tracking-wide mb-5">
            LOGIN
          </h2>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Login As Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                Login As
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <User className="w-5 h-5" />
                </div>
                <select
                  value={role}
                  onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all"
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            {/* User ID Field */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                User ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your User ID"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium placeholder:text-neutral-400"
                />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 pl-1">
                {role === 'Student' && 'Default: ASH-2024-042 (Aarav Sharma)'}
                {role === 'Teacher' && 'Default: TCH-MAT-104 (Pooja Patel)'}
                {role === 'Admin' && 'Default: ADM-PRIN-01 (Dr. Mehta)'}
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={hidePassword ? 'password' : 'text'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full pl-10 pr-11 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium placeholder:text-neutral-400"
                />
                <button
                  type="button"
                  onClick={() => setHidePassword(!hidePassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label={hidePassword ? 'Show password' : 'Hide password'}
                >
                  {hidePassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-[50px] bg-[#1E88E5] hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-[17px] tracking-wide rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center cursor-pointer"
              >
                LOGIN
              </button>
            </div>

            {/* Help Link */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="text-xs text-neutral-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                Contact School Admin for Login Help
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-xs text-neutral-400 mt-5 font-medium">
          © Ashadeep School
        </p>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-100">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-neutral-800">
              Ashadeep Helpdesk
            </h3>
            <p className="text-xs text-neutral-500 text-center mt-1">
              For student admission ID issues, lost credentials, or password resets:
            </p>
            <div className="mt-4 space-y-2.5 bg-neutral-50 rounded-xl p-3.5 text-xs text-neutral-700 border border-neutral-200/60 font-medium">
              <div className="flex justify-between">
                <span className="text-neutral-500">Office Timings:</span>
                <span className="font-semibold">Mon - Sat (8 AM - 3 PM)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Helpline:</span>
                <span className="font-semibold text-blue-600">+91 261 245 8899</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Email:</span>
                <span className="font-semibold text-blue-600">support@ashadeep.edu.in</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="mt-5 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
