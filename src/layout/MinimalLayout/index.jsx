import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

// ==============================|| MINIMAL LAYOUT ||============================== //

export default function MinimalLayout() {
  const isAuthenticated = useSelector((store) => store?.auth?.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated ? <Outlet /> : null;
}
