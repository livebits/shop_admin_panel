import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    ArrayInput,
    ReferenceInput,
    SelectInput,
    SimpleFormIterator,
    TextInput,
    NumberInput,
    usePermissions,
    BooleanInput,
} from 'react-admin';
import { SaveButton, Toolbar } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const CreateToolbar = (props: any) => (
    <Toolbar {...props} >
        <SaveButton
            label="ذخیره"
            redirect="list"
            submitOnEnter={true}
        />
        <SaveButton
            label="ذخیره و جدید"
            redirect={false}
            submitOnEnter={false}
            variant="text"
        />
    </Toolbar>
);

const CategoryCreate = (props:any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'category', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }
    return (
        <Create {...props}>
            <SimpleForm toolbar={<CreateToolbar />} redirect="list">
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
        </Create>
    );
};

export default CategoryCreate;
