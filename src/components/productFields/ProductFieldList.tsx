import * as React from 'react';
import { Datagrid, TextField, BooleanField, DateField, NumberField, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import CustomDateField from '../commons/CustomDateField';

const ProductFieldList = (props: any) => (
    <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={25}
        title="فیلدهای محصولات"
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            {/* <DateField source="createdAt" /> */}
            <FunctionField
                source="createdAt"
                render={(record:any) => <CustomDateField source={record.createdAt} />}
            />
            <TextField source="name" />
            <TextField source="hint" />
            <TextField source="dataType" />
            <TextField source="defaultValue" />
            <BooleanField source="isRequired" />
            <NumberField source="priority" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default ProductFieldList;
