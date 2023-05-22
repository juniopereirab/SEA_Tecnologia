import dayjs from 'dayjs';
import * as Yup from 'yup';

const CPFRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const RGRegex = /^\d{2}\.\d{3}\.\d{1}-\d{1}$/;

export const workerSchema = Yup.object().shape({
    name: Yup.string().required(),
    isMale: Yup.boolean().required(),
    cpf: Yup.string().matches(CPFRegex).required(),
    rg: Yup.string().matches(RGRegex).required(),
    birthdate: Yup.mixed().test('is-dayjs', 'Invalid Date', (value) => {
        return dayjs.isDayjs(value);
    }),
    role: Yup.number().required(),
    documentUrl: Yup.string(),
    activities: Yup.mixed(),
})