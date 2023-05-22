import { DatePicker, Select, Space } from 'antd';
import InputMask from 'react-input-mask';
import React from 'react';
import "./styles.scss";

interface IFormInput {
    type: 'text' | 'date' | 'option' | 'select';
    mask?: string;
    label?: string;
    placeholder?: string;
    items?: ISelectOptionInput[];
    value: string | number;
    onChange: any;
    name: string;
    id: string;
}

const datePickerStyle: React.CSSProperties = {
    height: '36px',
    border: '1px solid #4FA1C1',
    borderRadius: '10px',
}

function FormInput({
    type,
    mask,
    placeholder,
    label = "",
    items,
    value,
    onChange,
    name,
    id,
}: IFormInput) {
  return (
    <React.Fragment>
        {mask && (
            <label>
                {label}
                <InputMask name={name} id={id} mask={mask} value={value} onChange={onChange} className='basic-input'/>
            </label>
        )}
        {type === 'text' && !mask && (
            <label htmlFor={id}>
                {label}
                <input name={name} id={id} placeholder={placeholder} value={value} onChange={onChange} className='basic-input'/>
            </label>
        )}
        {type === 'option' && (
            <label style={{gap: '17px'}}>
                {label}
                <Space size={24}>
                    {items && items.map((item) => (
                        <label htmlFor={item.label} className="row">
                            <input type="radio" value={item.value} onChange={onChange} checked={item.value === value}></input>
                            {item.label}
                        </label>
                    ))}
                </Space>
            </label>
        )}
        {type === 'select' && (
            <label>
                {label}
                <Select
                    bordered={false}
                    defaultValue={items ? items[0].value : null}
                    onChange={onChange}
                    options={items}
                    style={datePickerStyle}
                />
            </label>
        )}
        {type === 'date' && (
            <label>
                {label}
                <DatePicker
                    style={datePickerStyle}
                    placeholder={'DD/MM/YYYY'}
                    format="DD/MM/YYYY"
                    onPanelChange={onChange}
                    onChange={onChange}
                />
            </label>
        )}
    </React.Fragment>
  )
}

export default FormInput;