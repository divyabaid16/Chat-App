import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from './pages/authentication';
import Groups from './pages/groups';
import GroupChat from './pages/GroupChat';

const App = () => {
  return (
    <div style={{ margin: '20px' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Authentication />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/chat/:groupId" element={<GroupChat />} />
        </Routes>
      </BrowserRouter>
    </div >
  )
};

export default App;