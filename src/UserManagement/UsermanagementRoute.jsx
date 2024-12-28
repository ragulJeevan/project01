import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Department from './Department';
import Designation from './Designation';
import User from './User';

const UsermanagementRoute = () => {
  return (
    <Routes>
      <Route path="department" element={<Department />} />
      <Route path="designation" element={<Designation />} />
      <Route path="user" element={<User />} />
    </Routes>
  );
};

export default UsermanagementRoute;
