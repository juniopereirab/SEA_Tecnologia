import React from 'react'
import "./styles.scss";
import { useDispatch, useSelector } from 'react-redux';
import CompanyBadge from '../../components/CompanyBadge';
import DashedLine from '../../components/DashedLine';
import { setSelectedCompany } from '../../store/reducers/company';

function Workers() {
    const dispatch = useDispatch();
    const { list, selectedCompany } = useSelector((state: RootState) => state.company);

    const selectCompany = (index: number) => {
        dispatch(setSelectedCompany(index));
    } 
    return (
        <div className='workers-page'>
            <div className="companies-section">
                {list.map((company, index) => {
                    return (
                        <React.Fragment>
                            {index !== 0 && <DashedLine />}
                            <CompanyBadge
                                name={company.name}
                                isRegistrationDone={company.isRegistrationDone}
                                isActive={selectedCompany === index}
                                onClick={() => selectCompany(index)}
                            />
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default Workers;