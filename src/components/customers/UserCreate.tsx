import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    PasswordInput,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextInput,
    required,
} from 'react-admin';

const defaultValue = { type: 'customer' };

const UserCreate = (props:any) => {
    
    return (
        <Create {...props} title="ثبت مشتری جدید">
            <SimpleForm initialValues={defaultValue} >
                <TextInput source="firstName" />
                <TextInput source="lastName" />
                <TextInput source="username" />
                <PasswordInput source="password" />
                <TextInput source="email" />
                <SelectInput source="status" choices={[
                    { id: 'active', name: 'فعال' },
                    { id: 'inactive', name: 'غیرفعال' },
                ]} />
            </SimpleForm>
        </Create>
    );
};

export default UserCreate;
