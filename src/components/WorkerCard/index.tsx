import React from 'react';
import "./styles.scss";
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { formatarCPF } from '../../utils';
import EtcIcon from '../../icons/Etc.svg';
import { useDispatch } from 'react-redux';
import { setDeleteModalOpen, setRegistrationMode } from '../../store/reducers/company';

interface IWorkerCard {
  worker: IWorker;
}

const buttonStyles: React.CSSProperties = {
  width: '49px',
  height: '100%',
  background: '#4FA1C1',
  borderRadius: '0 10px 10px 0',
  color: 'white',
  fontSize: '16px',
  lineHeight: '18px',
  fontWeight: 700,
}

function WorkerCard({ worker }: IWorkerCard) {
  const dispatch = useDispatch();

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <span>Editar funcionário</span>
      ),
      onClick: () => {
        dispatch(setRegistrationMode({
          isRegistrationMode: true,
          worker,
        }));
      }
    },
    {
      key: 2,
      label: (
        <span>Deletar funcionário</span>
      ),
      onClick: () => {
        dispatch(setDeleteModalOpen({
          isDeleteModalOpen: true,
          workerId: worker.id,
        }));
      }
    }
  ];

  return (
    <div className='worker-card'>
      <Space direction='vertical' style={{padding: '12px'}}>
        <span className='worker-name'>{worker.name}</span>
        <Space size={12}>
          <div className="info-badge">
            {formatarCPF(worker.cpf)}
          </div>
          {worker.activities.map((activity, index) => (
            <div className="info-badge" key={`act${index}`}>
              {activity.name}
            </div>
          ))}
          <div className="info-badge">
            {worker.role}
          </div>
        </Space>
      </Space>
      <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
        <Button style={buttonStyles}><img src={EtcIcon} alt="button label" /></Button>
      </Dropdown>
    </div>
  )
}

export default WorkerCard