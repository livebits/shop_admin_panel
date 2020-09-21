import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    PasswordInput,
    useTranslate,
    SelectInput,
    TabbedForm,
    TextInput,
    required,
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const TenantCreate = (props:any) => {
    const translate = useTranslate();
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'tenant', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return (
        <Create {...props}>
            <SimpleForm >
                <TextInput source="name" validate={required()} />
                <TextInput source="description" multiline fullWidth />
                <TextInput source="phone" />
                <TextInput source="mobile" />
                <SelectInput source="status" validate={required()} choices={[
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
        </Create>
    );
};

export default TenantCreate;
