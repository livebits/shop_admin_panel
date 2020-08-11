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

const defaultValue = { type: 'manager' };

const ManagerCreate = (props:any) => {
    
    return (
        <Create {...props}>
            <SimpleForm initialValues={defaultValue}>
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

export default ManagerCreate;
