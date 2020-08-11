import * as React from 'react';
import { FC } from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    DateInput,
    SelectInput,
    SimpleForm,
    TextInput,
    useTranslate,
} from 'react-admin';
const ManagerEdit = (props: any) => (
    <Edit title="ویرایش کاربر" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="username" />
            <TextInput source="email" />
            <SelectInput source="status" choices={[
                { id: 'active', name: 'فعال' },
                { id: 'inactive', name: 'غیرفعال' },
            ]} />
        </SimpleForm>
    </Edit>
);

export default ManagerEdit;
