import * as React from 'react';
import { Datagrid, TextField, ArrayField, SingleFieldList, FunctionField, DateField, EditButton, List, usePermissions, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import CustomDateField from '../commons/CustomDateField';

const RoleList = (props: any) => {
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'role', action: 'read' }])
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
            {/* <DateField source="createdAt" /> */}
            <FunctionField
                source="createdAt"
                render={(record:any) => <CustomDateField source={record.createdAt} />}
            />
            <TextField source="name" />
            {/* <ArrayField source="rolePermissions">
                <SingleFieldList>
                    <ChipField source="permission.name" />
                </SingleFieldList>
            </ArrayField> */}
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
