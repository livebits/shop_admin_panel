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
const TenantEdit = (props: any) => (
    <Edit title="ویرایش شرکت" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="description" fullWidth />
            <TextInput source="phone" />
            <TextInput source="mobile" />
            <SelectInput source="status" choices={[
                { id: 'active', name: 'فعال' },
                { id: 'inactive', name: 'غیرفعال' },
                { id: 'pending_confirmation', name: 'در حال بررسی' },
                { id: 'expired', name: 'منقضی شده' },
            ]} />
            <TextInput source="address" />
            <TextInput source="country" />
            <TextInput source="city" />
            <TextInput source="state" />
            <TextInput source="zip" />
        </SimpleForm>
    </Edit>
);

export default TenantEdit;
