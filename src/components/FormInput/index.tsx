import { DatePicker, Select, Space } from 'antd';
import InputMask from 'react-input-mask';
import React from 'react';
import "./styles.scss";
import dayjs from 'dayjs';

interface IFormInput {
    type: 'text' | 'date' | 'option' | 'select';
    mask?: string;
    label?: string;
    placeholder?: string;
    items?: ISelectOptionInput[];
    value?: string | number ;
    onChange: any;
    name: string;
    id: string;
    dateValue?: dayjs.Dayjs | null;
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
    dateValue,
}: IFormInput) {
  return (
    <React.Fragment>
        {mask && (
            <label>
                {label}
                <InputMask mask={mask} maskChar={" "} value={value} onChange={onChange} className='basic-input' name={name} id={id} />
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
                    defaultValue={null}
                    onChange={onChange}
                    options={items}
                    style={datePickerStyle}
                    value={value}
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
                    value={dateValue}
                />
            </label>
        )}
    </React.Fragment>
  )
}

export default FormInput;