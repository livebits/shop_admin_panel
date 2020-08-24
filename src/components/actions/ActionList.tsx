import * as React from 'react';
import { Datagrid, TextField, usePermissions, DateField, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const ActionList = (props: any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'permission', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={25}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="resource" />
            <TextField source="action" />
            <TextField source="description" />
            {
                hasPermissions(permissions, [{ resource: 'permission', action: 'update' }]) && 
                <EditButton />
            } 
            {
                hasPermissions(permissions, [{ resource: 'permission', action: 'delete' }]) && 
                <DeleteButton />
            }
        </Datagrid>
    </List>
}

export default ActionList;
