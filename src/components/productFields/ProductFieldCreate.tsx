import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    PasswordInput,
    ReferenceInput,
    SelectInput,
    NumberInput,
    TextInput,
    BooleanInput,
} from 'react-admin';

const ProductFieldCreate = (props:any) => {
    
    return (
        <Create {...props}>
            <SimpleForm>
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
        </Create>
    );
};

export default ProductFieldCreate;
