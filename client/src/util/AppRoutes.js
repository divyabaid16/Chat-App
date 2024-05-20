import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Authentication from '../pages/Authentication';
import Groups from '../pages/Groups';
import GroupChat from '../pages/GroupChat';
import { useAuth } from './AuthContext';

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return (
      <Routes>
        <Route path="/auth" element={<Navigate to="/" />} />
        <Route path="/" element={<Groups />} />
        <Route path="/group/:groupId" element={<GroupChat />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }
};

export default AppRoutes;
