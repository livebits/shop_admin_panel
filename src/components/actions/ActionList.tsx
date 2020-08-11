import * as React from 'react';
import { Datagrid, TextField, EmailField, DateField, EditButton, List, FunctionField, DeleteButton } from 'react-admin';

const ActionList = (props: any) => (
    <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={20}
        title="مجوزها"
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default ActionList;
