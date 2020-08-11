import * as React from 'react';
import { Datagrid, TextField, EmailField, DateField, EditButton, List, FunctionField, DeleteButton } from 'react-admin';

const ManagerList = (props: any) => (
    <List
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
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default ManagerList;
