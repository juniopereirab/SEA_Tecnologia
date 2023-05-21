import React, { useCallback, useEffect } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getCompanies, getEquipments, getWorkers, getRoles, getActivitiesWorkers } from './store/actions/company';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import AppRoutes from './router';
import { Layout } from 'antd';

type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { list, isLoading } = useSelector((state: RootState) => state.company);

  const loadCompanies = useCallback(async () => {
    if (list.length === 0) {
      await dispatch(getCompanies());
      await dispatch(getWorkers());
      await dispatch(getActivities());
      await dispatch(getEquipments());
      await dispatch(getRoles());
      await dispatch(getActivitiesWorkers());
    }
  }, [dispatch, list]);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  return (
    <Layout style={{paddingLeft: '57px'}}>
      {!isLoading && <AppRoutes />}
    </Layout>
  );
}

export default App;
