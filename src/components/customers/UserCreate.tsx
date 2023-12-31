import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    PasswordInput,
    ReferenceInput,
    SelectInput,
    required,
    TextInput,
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const defaultValue = { type: 'customer' };

const UserCreate = (props:any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'user', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return (
        <Create {...props} title="resources.customers.page.add">
            <SimpleForm initialValues={defaultValue} >
                <TextInput source="firstName" validate={required()} />
                <TextInput source="lastName" />
                <TextInput source="username" validate={required()} />
                <TextInput source="mobile" />
                <PasswordInput source="password" validate={required()} />
                <TextInput source="email" />
                <SelectInput source="status" choices={[
                    { id: 'active', name: 'pos.status.active' },
                    { id: 'inactive', name: 'pos.status.inactive' },
                ]} />
            </SimpleForm>
        </Create>
    );
};

export default UserCreate;
