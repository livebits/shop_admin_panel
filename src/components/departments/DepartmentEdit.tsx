import * as React from 'react';
import { FC } from 'react';
import {
    ReferenceInput,
    Edit,
    BooleanInput,
    NumberInput,
    SelectInput,
    SimpleForm,
    TextInput,
    useTranslate,
    ArrayInput,
    SimpleFormIterator,
} from 'react-admin';
const DepartmentEdit = (props: any) => (
    <Edit title="ویرایش واحد" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" label="کد" />
            <TextInput source="name" label="نام" />
            <TextInput source="description" fullWidth label="توضیحات" />
            {/* <TextInput source="logo" /> */}
        </SimpleForm>
    </Edit>
);

export default DepartmentEdit;
