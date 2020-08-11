import * as React from 'react';
import { Datagrid, TextField, ArrayField, SingleFieldList, ChipField, DateField, EditButton, List, FunctionField, DeleteButton } from 'react-admin';

const RoleList = (props: any) => (
    <List
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
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default RoleList;
