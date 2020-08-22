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
