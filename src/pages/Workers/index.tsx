import React from 'react'
import "./styles.scss";
import { useDispatch, useSelector } from 'react-redux';
import CompanyBadge from '../../components/CompanyBadge';
import DashedLine from '../../components/DashedLine';
import { setDeleteModalOpen, setSelectedCompany } from '../../store/reducers/company';
import NextButton from '../../components/NextButton';
import WorkersInfo from '../../components/WorkersInfo';
import WorkerForm from '../../components/WorkerForm';
import { Modal } from 'antd';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { deleteWorker } from '../../store/actions/company';
import ShadowIcon from '../../icons/Shadow.svg';

type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

function Workers() {
    const dispatch: AppDispatch = useDispatch();
    const { list, selectedCompany, isRegistrationMode, isDeleteModalOpen, workerId, isLoading } = useSelector((state: RootState) => state.company);

    const selectCompany = (index: number) => {
        dispatch(setSelectedCompany(index));
    }

    if (list.length === 0) {
        return null;
    }

    const handleOk = () => {
        if (workerId) {
            dispatch(deleteWorker(workerId));
        }
    }

    const handleCancel = () => {
        dispatch(setDeleteModalOpen({
            isDeleteModalOpen: false,
            workerId: null,
        }));
    }

    return (
        <React.Fragment>
            <div className='workers-page'>
                <img src={ShadowIcon} alt="shadow" className="shadow-image"/>
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
                    {isRegistrationMode ? <WorkerForm /> : <WorkersInfo />}
                </div>
                {!isRegistrationMode && <NextButton />}
            </div>
            <Modal
                title="Deletar funcionário"
                open={isDeleteModalOpen}
                onOk={handleOk}
                confirmLoading={isLoading}
                onCancel={handleCancel}
            >
                <p>Você tem certeza que deseja deletar esse funcionário?</p>
            </Modal>
        </React.Fragment>
    )
}

export default Workers;