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
const ActionEdit = (props: any) => (
    <Edit title="ویرایش مجوز" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="description" fullWidth />
        </SimpleForm>
    </Edit>
);

export default ActionEdit;
