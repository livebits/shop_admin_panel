import * as React from 'react';
import { Datagrid, TextField, EmailField, DateField, EditButton, List, FunctionField, DeleteButton, usePermissions } from 'react-admin';
import { UserPermissions } from '../../types';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const ManagerList = (props:any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'user', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        filter={{ 'type||eq': 'manager' }}
        perPage={20}
        // actions={false}
        title="کاربران"
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <DateField source="createdAt" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="username" />
            <EmailField source="email" />
            <FunctionField
                label="وضعیت"
                render={(record:any) => record.status === 'active' ? 'فعال' : 'غیرفعال'}
            />
            <TextField source="lastLogin" />
            {
                hasPermissions(permissions, [{ resource: 'user', action: 'update' }]) && 
                <EditButton />
            } 
            {
                hasPermissions(permissions, [{ resource: 'user', action: 'delete' }]) && 
                <DeleteButton />
            }
        </Datagrid>
    </List>
};

export default ManagerList;
