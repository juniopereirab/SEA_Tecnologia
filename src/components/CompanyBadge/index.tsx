import React from 'react'
import "./styles.scss"

import CompanyIcon from '../../icons/Company.svg';

interface ICompanyBadge {
    name: string;
    isRegistrationDone: boolean;
    isActive: boolean;
    onClick: VoidFunction;
}

function CompanyBadge({name, isRegistrationDone, isActive, onClick}: ICompanyBadge) {
  return (
    <div className='badge-wrapper' onClick={onClick}>
        <div className={`company-badge ${isActive && 'active'}`}>
            <img src={CompanyIcon} alt="company-icon"/>
        </div>
        <span className='name'>{name}</span>
        {isRegistrationDone && <span>Concluído</span>}
    </div>
  )
}

export default CompanyBadge