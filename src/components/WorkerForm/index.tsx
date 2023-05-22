import React, { useState } from 'react'
import "./styles.scss";
import { Button, Col, DatePickerProps, Row, Space, Switch } from 'antd';
import BackIcon from "../../icons/Back.svg";
import { useDispatch, useSelector } from 'react-redux';
import { setRegistrationMode } from '../../store/reducers/company';
import { useFormik } from 'formik';
import FormInput from '../FormInput';
import ActivityInput from '../ActivityInput';
import { workerSchema } from '../../utils/schemas';
import dayjs from 'dayjs';
import { createWorker, updateWorker } from '../../store/actions/company';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { formatRG, formatarCPF } from '../../utils';

const genderOptions: ISelectOptionInput[] = [
    {
        value: 1,
        label: 'Masculino'
    },
    {
        value: 0,
        label: 'Feminino'
    }
];

const defaultActivity: ICurrentActivity = {
    companyId: null,
    activityId: null,
    workerId: null,
    equipmentsId: [],
}

interface IWorkerFormData {
    id?: number;
    name: string;
    isMale: boolean;
    cpf: string;
    rg: string;
    birthdate: dayjs.Dayjs | null;
    role: number | string;
    activities: ICurrentActivity[],
    documentUrl?: string,
    companyId: number | string,
    isActive: boolean;
}

const initialValues: IWorkerFormData = {
    name: "",
    isMale: true,
    cpf: "",
    rg: "",
    birthdate: null,
    role: "",
    activities: [],
    companyId: "",
    isActive: false,
}

const buttonStyles: React.CSSProperties = {
    width: '100%',
    borderRadius: '10px',
    border: '1px solid #4FA1C1',
    height: '36px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#3A3A3A',
    fontFamily: 'Roboto',
    marginTop: '10px',
}

type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

function WorkerForm() {
    const dispatch: AppDispatch = useDispatch();
    const [fileName, setFileName] = useState<string>("");
    const { list, selectedCompany, selectedWorker } = useSelector((state: RootState) => state.company);

    const handleRegistrationMode = () => {
        dispatch(setRegistrationMode({
            isRegistrationMode: false,
            worker: null,
        }));
    }

    const roles = list[selectedCompany].roles.map((role) => {
        return {
            value: role.id,
            label: role.name,
        }
    });

    const currentInitialValues: IWorkerFormData = selectedWorker ? {
        birthdate: dayjs(selectedWorker.birthdate),
        cpf: formatarCPF(selectedWorker.cpf),
        companyId: selectedWorker.companyId,
        isActive: selectedWorker.isActive,
        isMale: selectedWorker.isMale,
        name: selectedWorker.name,
        rg: formatRG(selectedWorker.rg),
        role: selectedWorker.roleId,
        documentUrl: selectedWorker?.documentUrl,
        activities: selectedWorker.activities.map((activity) => {
            return {
                activityId: activity.activityId,
                companyId: activity.companyId,
                equipmentsId: activity.equipmentsId,
                workerId: activity.workerId,
                id: activity.id
            }
        }),
        id: selectedWorker.id,
    } : initialValues;

    const onSubmit = (values: IWorkerFormData) => {
        const valuesToSubmit: IWorkerFormData = {
            ...values,
            cpf: values.cpf.replace(/[.-]/g, ''),
            rg: values.rg.replace(/[.-]/g, ''),
            companyId: list[selectedCompany].id,
        }

        if (selectedWorker) {
            dispatch(updateWorker(valuesToSubmit));
            return;
        }

        dispatch(createWorker(valuesToSubmit));
    }

    const formik = useFormik({
        initialValues: currentInitialValues,
        onSubmit,
        validationSchema: workerSchema,
        enableReinitialize: true,
    });

    const handleAddActivity = () => {
        formik.setFieldValue('activities', [...formik.values.activities, defaultActivity]);
    }

    const handleAddEquipments = (index: number) => {
        const equipmentId = [...formik.values.activities[index].equipmentsId];
        equipmentId.push(0);
        formik.setFieldValue(`activities[${index}].equipmentsId`, equipmentId);
    }

    const handleActivityChange = (value: number, index: number) => {
        formik.setFieldValue(`activities[${index}].activityId`, value);
    }

    const handleEquipmentChange = (equipmentId: number, activityIndex: number, equipmentIndex: number) => {
        formik.setFieldValue(`activities[${activityIndex}].equipmentsId[${equipmentIndex}]`, equipmentId);
    }

    const getEquipmentValue = (activityIndex: number, equipmentIndex: number) => {
        return formik.values.activities[activityIndex].equipmentsId[equipmentIndex];
    }

    const handleRoleChange = (roleId: number) => {
        formik.setFieldValue('role', roleId);
    }

    const handleDateChange: DatePickerProps['onChange'] = (date) => {
        formik.setFieldValue('birthdate', date);
    }
    
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue('isMale', Boolean(Number(event.target.value)))
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const urlToSave = URL.createObjectURL(event.target.files[0]);
            formik.setFieldValue('documentUrl', urlToSave);
            setFileName(event.target.files[0].name);
        }
    }

    return (
        <div className="worker-form">
            <div className="form-header">
                <Space size={14}>
                    <img src={BackIcon} alt="back icon" onClick={handleRegistrationMode}/>
                    <span>Adicionar Funcionário</span>
                </Space>
            </div>
            <div className="form-content">
                <div className="block">
                    <Space style={{justifyContent: 'space-between', width: '100%'}}>
                        <h6>O trabalhador está ativo ou inativo?</h6>
                        <Switch
                            onChange={(value) => formik.setFieldValue('isActive', value)}
                            checked={formik.values.isActive}
                            checkedChildren="Ativo"
                            unCheckedChildren="Inativo"
                            style={{ backgroundColor: '#4FA1C1' }}
                        />
                    </Space>
                </div>
                <div className="block">
                    <Row gutter={[25, 14]}>
                        <Col span={12}>
                            <FormInput id="name" name="name" onChange={formik.handleChange} type='text' value={formik.values.name} label='Nome'/>
                        </Col>
                        <Col span={12}>
                            <FormInput id="isMale" name="isMale" onChange={handleGenderChange} type='option' value={Number(formik.values.isMale)} label='Sexo' items={genderOptions}/>
                        </Col>
                        <Col span={12}>
                            <FormInput id="cpf" name="cpf" onChange={formik.handleChange} type='text' mask="999.999.999-99" value={formik.values.cpf} label='CPF'/>
                        </Col>
                        <Col span={12}>
                            <FormInput id="birthdate" name="birthdate" onChange={handleDateChange} type='date' dateValue={formik.values.birthdate} label='Data de Nascimento'/>
                        </Col>
                        <Col span={12}>
                            <FormInput id="rg" name="rg" onChange={formik.handleChange} type='text' mask="99.999.9-9" value={formik.values.rg} label='RG'/>
                        </Col>
                        <Col span={12}>
                            <FormInput id="role" name="role" onChange={handleRoleChange} type='select' value={formik.values.role} label='Cargo' items={roles}/>
                        </Col>
                    </Row>
                </div>
                <div className="block">
                    <h6>Quais EPIs o trabalhador usa na atividade?</h6>
                    {formik.values.activities.map((activity, index) => (
                        <ActivityInput
                            key={index}
                            index={index}
                            name={`activities[${index}].activityId`}
                            id={`activities[${index}].activityId`}
                            onChange={handleActivityChange}
                            value={formik.values.activities[index].activityId}
                            handleAddEquipments={handleAddEquipments}
                            handleEquipmentChange={handleEquipmentChange}
                            getEquipmentValue={getEquipmentValue}
                            equipmentsId={formik.values.activities[index].equipmentsId}
                        />
                    ))}
                    <Button style={buttonStyles} onClick={() => handleAddActivity()}>Adicionar outra atividade</Button>
                </div>
                <div className="block">
                    <Space size={12} direction='vertical' style={{width: '100%'}}>
                        <h6>Adicione Atestado de Saúde Ocupacional (opcional):</h6>
                        <input disabled value={fileName}/>
                        <label className="input-file">
                            Selecionar arquivo
                            <input type='file' name="documentUrl" id="documentUrl" onChange={handleFileChange}/>
                        </label>
                    </Space>
                </div>
                <Button style={buttonStyles} disabled={!formik.isValid || !formik.dirty} onClick={() => formik.handleSubmit()}>Salvar</Button>
            </div>
        </div>
    )
}

export default WorkerForm;