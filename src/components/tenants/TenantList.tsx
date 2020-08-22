import * as React from 'react';
import { Datagrid, TextField, usePermissions, DateField, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const translateStatus = (status: string) => {
    switch (status) {
        case 'active':
            return 'فعال';
        case 'inactive':
            return 'غیرفعال';
        case 'pending_confirmation':
            return 'در حال بررسی';
        case 'expired':
            return 'منقضی شده';
        default:
            return '';
    }
}

const TenantList = (props: any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'tenant', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }
    
    return <List
        {...props}
        sort={{ field: 'createdAt', order: 'DESC' }}
        perPage={20}
        title="شرکت ها"
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
                label="وضعیت"
                render={(record:any) => translateStatus(record.status)}
            />
            <TextField source="type" />
            <TextField source="address" />
            <TextField source="country" />
            <TextField source="city" />
            <TextField source="state" />
            <TextField source="zip" />
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
