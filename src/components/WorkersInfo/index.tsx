import React from 'react'
import "./styles.scss"
import { Button, Space } from 'antd'
import { useSelector } from 'react-redux'
import WorkerCard from '../WorkerCard'
import Switcher from '../Switcher'

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

function WorkersInfo() {
    const { list, selectedCompany } = useSelector((state: RootState) => state.company);

    const handleSwitcherAction = (checked: boolean) => {
        console.log(checked);
    }

    return (
        <div className='workers-info'>
            <div className="title">Funcionário(s)</div>
            <Space style={{padding: '30px 20px', width: '100%'}} direction='vertical' size={20}>
                <Button style={buttonStyles}>+ Adicionar funcionário</Button>
                <Space style={{justifyContent: 'space-between', width: '100%'}}>
                    <Space size={30}>
                        <Button style={filterButtons}>Ver apenas ativos</Button>
                        <Button style={filterButtons}>Limpar Filtros</Button>
                    </Space>
                    <span className="info">Ativos 2/25</span>
                </Space>
                <Space style={{width: '100%'}} direction='vertical' size={14}>
                    {list[selectedCompany].workers.map((worker, index) => (
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