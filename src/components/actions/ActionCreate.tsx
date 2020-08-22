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

const ActionCreate = (props:any) => {
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'permission', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="resource" />
                <TextInput source="action" />
                <TextInput source="description" fullWidth />
            </SimpleForm>
        </Create>
    );
};

export default ActionCreate;
