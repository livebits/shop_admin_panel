import * as React from 'react';
import { usePermissions, Datagrid, TextField, EmailField, DateField, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { BulkDeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
// import ResetViewsButton from './ResetViewsButton';

const BulkActionButtons = (props: any) => (
    <Fragment>
        {/* <ResetViewsButton label="Reset Views" {...props} /> */}
        {/* default bulk delete action */}
        <BulkDeleteButton {...props} />
    </Fragment>
);

const UserList = (props: any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'user', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        filter={{ 'type||eq': 'customer' }}
        perPage={20}
        // actions={false}
        title="مشتریان"
        bulkActionButtons={<BulkActionButtons />}
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
}

export default UserList;
