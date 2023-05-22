import { Button, Col, Row, Select, Space } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./styles.scss";
import EquipmentInput from '../EquipmentInput';

interface IActivityInput {
    index: number;
    onChange: (value: number, index: number) => void;
    handleAddEquipments: (index: number) => void;
    handleEquipmentChange: (equipmentId: number, activityIndex: number, equipmentIndex: number) => void;
    getEquipmentValue: (activityIndex: number, equipmentIndex: number) => number;
    value: any;
    name: string;
    id: string;
    equipmentsId: number[];
}

const selectStyles: React.CSSProperties = {
    height: '36px',
    border: '1px solid #4FA1C1',
    borderRadius: '10px',
}

const buttonStyles: React.CSSProperties = {
    width: '100%',
}


function ActivityInput({ index, onChange, value, handleAddEquipments, equipmentsId, handleEquipmentChange, getEquipmentValue }: IActivityInput) {
    const { list, selectedCompany } = useSelector((state: RootState) => state.company);
    const [useEPI, setUseEPI] = useState<boolean>(true);

    const activities = list[selectedCompany].activities.map((activity) => ({
        value: activity.id,
        label: activity.name,
    }));

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUseEPI(!Boolean(Number(e.target.value)));
    }

    return (
        <React.Fragment>
            <label className='epi-act'>
                <input type="checkbox" checked={!useEPI} value={Number(useEPI)} onChange={handleCheckbox}/>
                O trabalhador não usa EPI.
            </label>
            <div className="block">
                <Row gutter={[12, 10]}>
                    <Col span={24}>
                        <label>
                            Selecione a atividade:
                            <Select
                                bordered={false}
                                defaultValue={value}
                                options={activities}
                                onChange={(value: number) => onChange(value, index)}
                                placeholder="Ex: Supervisão"
                                style={selectStyles}
                            />
                        </label>
                    </Col>
                    {useEPI && equipmentsId.map((equipment, equipmentIndex) => (
                        <EquipmentInput
                            id={`activities[${index}].equipmentsId[${equipmentIndex}]`}
                            name={`activities[${index}].equipmentsId[${equipmentIndex}]`}
                            onChange={handleEquipmentChange}
                            value={getEquipmentValue(index, equipmentIndex)}
                            key={equipmentIndex}
                            index={equipmentIndex}
                            activityIndex={index}
                        />
                    ))}
                    {useEPI && (
                        <Col span={6}>
                            <Space style={{width: '100%', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                                <Button type="text" onClick={() => handleAddEquipments(index)} style={buttonStyles}>Adicionar EPI</Button>
                            </Space>
                        </Col>
                    )}
                </Row>
            </div>
        </React.Fragment>
    )
}

export default ActivityInput