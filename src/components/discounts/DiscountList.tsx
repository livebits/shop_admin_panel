import * as React from 'react';
import { Datagrid, TextField, NumberField, DateField, EditButton, List, FunctionField, DeleteButton } from 'react-admin';

const translateType = (type: string) => {
    switch (type) {
        case 'percent':
            return 'درصدی';
        case 'constant':
            return 'ثابت';
        default:
            return '';
    }
}

const DiscountList = (props: any) => (
    <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={20}
        title="تخفیفات"
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <FunctionField
                label="نوع تخفیف"
                render={(record:any) => translateType(record.type)}
            />
            <TextField source="code" />
            <NumberField source="value" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default DiscountList;
