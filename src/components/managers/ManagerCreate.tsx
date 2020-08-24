import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    PasswordInput,
    ReferenceInput,
    ReferenceArrayInput,
    SelectInput,
    AutocompleteInput,
    SelectArrayInput,
    TextInput,
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const defaultValue = { type: 'manager' };

const ManagerCreate = (props:any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'user', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }
    
    return (
        <Create {...props}>
            <SimpleForm initialValues={defaultValue}>
                <TextInput source="firstName" />
                <TextInput source="lastName" />
                <TextInput source="username" />
                <PasswordInput source="password" />
                <TextInput source="email" />
                <SelectInput source="status" choices={[
                    { id: 'active', name: 'pos.status.active' },
                    { id: 'inactive', name: 'pos.status.inactive' },
                ]} />
                <ReferenceArrayInput
                    source="roles"
                    reference="roles"
                    filterToQuery={(searchText:string) => (searchText ? { name: searchText } : null)}>
                    <SelectArrayInput optionText="name" />
                </ReferenceArrayInput>
            </SimpleForm>
        </Create>
    );
};

export default ManagerCreate;
