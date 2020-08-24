import * as React from 'react';
import { FC } from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    useTranslate,
    SelectInput,
    SimpleForm,
    TextInput,
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
const TenantEdit = (props: any) => {
    const translate = useTranslate();
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'tenant', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="description" fullWidth />
            <TextInput source="phone" />
            <TextInput source="mobile" />
            <SelectInput source="status" choices={[
                { id: 'active', name: translate('pos.tenantStatus.active') },
                { id: 'inactive', name: translate('pos.tenantStatus.inactive') },
                { id: 'pending_confirmation', name: translate('pos.tenantStatus.pending_confirmation') },
                { id: 'expired', name: translate('pos.tenantStatus.expired') },
            ]} />
            <TextInput source="address" />
            <TextInput source="country" />
            <TextInput source="city" />
            <TextInput source="state" />
            <TextInput source="zip" />
        </SimpleForm>
    </Edit>
}

export default TenantEdit;
