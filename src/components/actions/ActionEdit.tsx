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
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
const ActionEdit = (props: any) => {
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'permission', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <Edit title="ویرایش مجوز" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="resource" />
            <TextInput source="action" />
            <TextInput source="description" fullWidth />
        </SimpleForm>
    </Edit>
}

export default ActionEdit;
