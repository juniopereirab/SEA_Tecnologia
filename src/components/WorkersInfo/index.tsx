import React from 'react'
import "./styles.scss"
import { Button, Space } from 'antd'

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
  return (
    <div className='workers-info'>
        <div className="title">Funcionário(s)</div>
        <div className="container">
            <Button style={buttonStyles}>+ Adicionar funcionário</Button>
            <Space style={{justifyContent: 'space-between'}}>
                <Space size={30}>
                    <Button style={filterButtons}>Ver apenas ativos</Button>
                    <Button style={filterButtons}>Limpar Filtros</Button>
                </Space>
                <span className="info">Ativos 2/25</span>
            </Space>
        </div>
    </div>
  )
}

export default WorkersInfo