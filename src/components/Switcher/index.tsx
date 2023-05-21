import { Space, Switch } from 'antd';
import React from 'react'

interface ISwitcher {
    message: string;
    onChange: (value: boolean) => void;
    checked: boolean;
}

function Switcher({ message, onChange, checked}: ISwitcher) {

    return (
        <Space size={12}>
            {message}
            <Switch
                onChange={onChange}
                checked={checked}
                checkedChildren="Sim"
                unCheckedChildren="Não"
                style={{ backgroundColor: '#4FA1C1' }}
            />
        </Space>
    )
}

export default Switcher