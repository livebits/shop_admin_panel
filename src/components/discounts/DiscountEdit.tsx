import * as React from 'react';
import { FC } from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    NumberInput,
    SelectInput,
    SimpleForm,
    TextInput,
    useTranslate,
} from 'react-admin';
const DiscountEdit = (props: any) => (
    <Edit title="ویرایش  تخفیف" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <SelectInput source="type" choices={[
                { id: 'constant', name: 'ثابت' },
                { id: 'percent', name: 'درصدی' },
            ]} />
            <NumberInput source="value" />
        </SimpleForm>
    </Edit>
);

export default DiscountEdit;
