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
const CategoryEdit = (props: any) => (
    <Edit title="ویرایش دسته بندی" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" label="کد" />
            <TextInput source="name" label="نام" />
            <TextInput source="description" fullWidth label="توضیحات" />
            {/* <TextInput source="logo" /> */}
            <ReferenceInput source="parentId" reference="categories" label="والد">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ArrayInput 
                source="categoryFields" 
                label="فیلدهای دسته بندی"
                sort={{ field: 'priority', order: 'ASC' }}
            >
                <SimpleFormIterator>
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
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
