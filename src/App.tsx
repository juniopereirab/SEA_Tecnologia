import React, { useCallback, useEffect } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies } from './store/actions/company';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import AppRoutes from './router';
import { Layout } from 'antd';

type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.company);

  const loadCompanies = useCallback(() => {
    if (list.length === 0) {
      dispatch(getCompanies());
    }
  }, [dispatch, list]);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  return (
    <Layout style={{paddingLeft: '57px'}}>
      <AppRoutes />
    </Layout>
  );
}

export default App;
