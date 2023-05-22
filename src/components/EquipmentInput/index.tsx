import React from 'react'
import { Col, Select } from 'antd';
import { useSelector } from 'react-redux';

interface IEquipmentInput {
    id: string;
    name: string;
    onChange: (equipmentId: number, activityIndex: number, equipmentIndex: number) => void;
    value: number;
    index: number;
    activityIndex: number;
}

const selectStyles: React.CSSProperties = {
    height: '36px',
    border: '1px solid #4FA1C1',
    borderRadius: '10px',
}

function EquipmentInput({ id, onChange, value, index, activityIndex }:IEquipmentInput) {
    const { list, selectedCompany } = useSelector((state: RootState) => state.company);

    const equipments = list[selectedCompany].equipments.map((equipment) => ({
        value: equipment.id,
        label: equipment.name,
    }));

    const findEquipment = list[selectedCompany].equipments.find(eqp => eqp.id === value);

    return (
        <React.Fragment>
            <Col span={9}>
                <label>
                    Selecione o EPI:
                    <Select
                        bordered={false}
                        defaultValue={null}
                        id={id}
                        options={equipments}
                        onChange={(value: number) => onChange(value, activityIndex, index)}
                        style={selectStyles}
                        value={value === 0 ? null : value}
                    />
                </label>
            </Col>
            <Col span={9}>
                <label className="input-ca">
                    Informe o número do CA:
                    <input type="number" disabled value={findEquipment?.numberCA}/>
                </label>
            </Col>
        </React.Fragment>
    )
}

export default EquipmentInput;