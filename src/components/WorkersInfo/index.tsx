import React from 'react'
import "./styles.scss"
import { Button, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import WorkerCard from '../WorkerCard'
import Switcher from '../Switcher'
import { setIsActiveFilter, setRegistrationMode } from '../../store/reducers/company'
import { updateCompany } from '../../store/actions/company'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

const buttonStyles: React.CSSProperties = {
    width: '100%',
    height: '60px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#4FA1C1',
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: 400,
    border: '1px solid #4FA1C1',
}

const filterButtons: React.CSSProperties = {
    width: '192px',
    height: '31px',
    color: '#4FA1C1',
    borderRadius: '10px',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 400,
    border: '1px solid #4FA1C1'
}

const activeButton: React.CSSProperties = {
    color: '#FFFFFF',
    background: '#4FA1C1'
}

type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

function WorkersInfo() {
    const dispatch: AppDispatch = useDispatch();
    const { list, selectedCompany, isActiveFilter } = useSelector((state: RootState) => state.company);

    const handleSwitcherAction = (checked: boolean) => {
        dispatch(updateCompany({
            id: list[selectedCompany].id,
            isRegistrationDone: checked,
        }))
    }
    
    const handleRegistrationMode = () => {
        dispatch(setRegistrationMode({
            isRegistrationMode: true,
            worker: null,
        }));
    }

    const activeStyle = isActiveFilter ? activeButton : {}
    const activeWorkers = list[selectedCompany].workers.filter((worker) => worker.isActive);
    const allWorkers = list[selectedCompany].workers;
    const workers = isActiveFilter ? activeWorkers : allWorkers;

    return (
        <div className='workers-info'>
            <div className="title">Funcionário(s)</div>
            <Space style={{padding: '30px 20px', width: '100%'}} direction='vertical' size={20}>
                <Button style={buttonStyles} onClick={handleRegistrationMode}>+ Adicionar funcionário</Button>
                <Space style={{justifyContent: 'space-between', width: '100%'}}>
                    <Space size={30}>
                        <Button style={{...filterButtons, ...activeStyle}} onClick={() => dispatch(setIsActiveFilter(!isActiveFilter))}>Ver apenas ativos</Button>
                        <Button style={filterButtons} onClick={() => dispatch(setIsActiveFilter(false))}>Limpar Filtros</Button>
                    </Space>
                    <span className="info">Ativos {activeWorkers.length}/{allWorkers.length}</span>
                </Space>
                <Space style={{width: '100%'}} direction='vertical' size={14}>
                    {workers.map((worker, index) => (
                        <WorkerCard worker={worker} key={`worker${index}`} />
                    ))}
                </Space>
                <Space style={{width: '100%', justifyContent: 'flex-end'}}>
                    <Switcher message='A etapa está concluída' checked={list[selectedCompany].isRegistrationDone} onChange={handleSwitcherAction}/>
                </Space>
            </Space>
        </div>
    )
}

export default WorkersInfo