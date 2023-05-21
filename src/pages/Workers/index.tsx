import React from 'react'
import "./styles.scss";
import { useDispatch, useSelector } from 'react-redux';
import CompanyBadge from '../../components/CompanyBadge';
import DashedLine from '../../components/DashedLine';
import { setSelectedCompany } from '../../store/reducers/company';
import NextButton from '../../components/NextButton';
import WorkersInfo from '../../components/WorkersInfo';

function Workers() {
    const dispatch = useDispatch();
    const { list, selectedCompany } = useSelector((state: RootState) => state.company);

    const selectCompany = (index: number) => {
        dispatch(setSelectedCompany(index));
    }

    if (list.length === 0) {
        return null;
    }

    return (
        <div className='workers-page'>
            <div className="companies-section">
                {list.map((company, index) => (
                        <React.Fragment key={index}>
                            {index !== 0 && <DashedLine />}
                            <CompanyBadge
                                name={company.name}
                                isRegistrationDone={company.isRegistrationDone}
                                isActive={selectedCompany === index}
                                onClick={() => selectCompany(index)}
                            />
                        </React.Fragment>
                    )
                )}
            </div>
            <div className="workers-section">
                <div className="company-description">
                    <span>{list[selectedCompany].description}</span>
                </div>
                <WorkersInfo />
            </div>
            <NextButton />
        </div>
    )
}

export default Workers;