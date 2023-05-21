import React from 'react';
import "./styles.scss";
import { Space } from 'antd';

import HomeIcon from '../../icons/Home.svg';
import HistoryIcon from '../../icons/History.svg';
import NotificationIcon from '../../icons/Notification.svg';
import NotificationAppendIcon from '../../icons/NotificationAppend.svg';
import OrganizationIcon from '../../icons/History.svg';
import ProfileIcon from '../../icons/Profile.svg';
import WorkersIcon from '../../icons/Workers.svg';


import SideBarIcon from '../SideBarIcon';


interface IMenuItem {
    icon: string;
    url: string;
    append?: string;
}

const MenuItems: IMenuItem[] = [
    {
        icon: HomeIcon,
        url: '/home',
    },
    {
        icon: WorkersIcon,
        url: '/'
    },
    {
        icon: OrganizationIcon,
        url: '/organization',
    },
    {
        icon: NotificationIcon,
        url: '/notification',
        append: NotificationAppendIcon,
    },
    {
        icon: HistoryIcon,
        url: '/history',
    },
    {
        icon: ProfileIcon,
        url: '/profile',
    },
]

function SideBar() {
  return (
    <div className="sidebar">
        <div className='white-block' />
        <Space direction='vertical' align='center' size="large">
            {MenuItems.map(({ icon, url }, index) => (
                <SideBarIcon
                    key={index}
                    icon={icon}
                    url={url}
                />
            ))}
        </Space>
    </div>
  )
}

export default SideBar