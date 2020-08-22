import * as React from 'react';
import { Datagrid, TextField, ArrayField, SingleFieldList, ChipField, DateField, EditButton, List, usePermissions, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const RoleList = (props: any) => {
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'role', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={20}
        title="نقش ها"
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <DateField source="createdAt" />
            <TextField source="name" />
            <ArrayField source="permissions">
                <SingleFieldList>
                    <ChipField source="action.name" />
                </SingleFieldList>
            </ArrayField>
            {
                hasPermissions(permissions, [{ resource: 'role', action: 'update' }]) && 
                <EditButton />
            } 
            {
                hasPermissions(permissions, [{ resource: 'role', action: 'delete' }]) && 
                <DeleteButton />
            }
        </Datagrid>
    </List>
}

export default RoleList;
