import * as React from 'react';
import { useTranslate, Datagrid, Filter, SearchInput, TextField, usePermissions, DateField, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { FilterProps } from '../../types';

const translateStatus = (status: string, translate: any) => {
    switch (status) {
        case 'active':
            return translate('pos.tenantStatus.active');
        case 'inactive':
            return translate('pos.tenantStatus.inactive');
        case 'pending_confirmation':
            return translate('pos.tenantStatus.pending_confirmation');
        case 'expired':
            return translate('pos.tenantStatus.expired');
        default:
            return '';
    }
}

interface FilterParams {
    name?: string;
}

export const ListFilter: React.FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="name" alwaysOn />
    </Filter>
);

const TenantList = (props: any) => {
    const translate = useTranslate();
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'tenant', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }
    
    return <List
        {...props}
        sort={{ field: 'createdAt', order: 'DESC' }}
        filters={<ListFilter />}
        perPage={25}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <DateField source="createdAt" />
            <TextField source="name" />
            <TextField source="description"/>
            <TextField source="phone" />
            <TextField source="mobile" />
            <TextField source="logo" />
            <FunctionField
                source="status"
                render={(record:any) => translateStatus(record.status, translate)}
            />
            <TextField source="type" />
            <TextField source="address" />
            {/* <TextField source="country" />
            <TextField source="city" />
            <TextField source="state" />
            <TextField source="zip" /> */}
            {
                hasPermissions(permissions, [{ resource: 'tenant', action: 'update' }]) && 
                <EditButton />
            } 
            {
                hasPermissions(permissions, [{ resource: 'tenant', action: 'delete' }]) && 
                <DeleteButton />
            }
        </Datagrid>
    </List>
}

export default TenantList;
