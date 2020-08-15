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
    BooleanInput,
    NumberInput,
} from 'react-admin';
const ProductFieldEdit = (props: any) => (
    <Edit title="ویرایش فیلد" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" label="نام"/>
            <NumberInput source="priority" label="اولویت"/>
            <TextInput source="hint" label="راهنما" fullWidth/>
            <SelectInput source="dataType" label="نوع فیلد" choices={[
                { id: 'number', name: 'عددی' },
                { id: 'string', name: 'متن' },
                { id: 'text', name: 'رشته' },
                { id: 'date', name: 'تاریخ' },
                { id: 'option', name: 'انتخابی' },
            ]} />
            <TextInput source="defaultValue" label="مقدار پیشفرض"/>
            <BooleanInput source="isRequired" label="اجباری؟"/>
        </SimpleForm>
    </Edit>
);

export default ProductFieldEdit;
