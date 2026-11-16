/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { FlutterSnackBar } from './components/FlutterSnackBar';
import { UserRole } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('Aarav Sharma');
  const [role, setRole] = useState<UserRole>('Student');
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);

  const showSnackBar = (msg: string) => {
    setSnackBarMessage(msg);
  };

  const handleLogin = (enteredId: string, selectedRole: UserRole) => {
    setUserName(enteredId);
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showSnackBar('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-[#F2F6FC] text-slate-800">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} showSnackBar={showSnackBar} />
      ) : (
        <HomePage
          userName={userName}
          role={role}
          onLogout={handleLogout}
          showSnackBar={showSnackBar}
        />
      )}

      {/* Flutter style SnackBar display */}
      <FlutterSnackBar
        message={snackBarMessage}
        onClose={() => setSnackBarMessage(null)}
      />
    </div>
  );
}
