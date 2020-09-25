import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    FunctionField,
    ReferenceField,
    NumberField,
    Filter,
    DateInput,
} from 'react-admin';
import CustomDateField from '../commons/CustomDateField';
import { CustomDateInput } from '../commons/CustomDatePicker';
import { CustomFilterDateInput } from '../commons/CustomFilterDatePicker';

// import FullNameField from '../../visitors/FullNameField';
// import AddressField from '../../visitors/AddressField';
import InvoiceShow from './InvoiceShow';

const ListFilters = (props: any) => (
    <Filter {...props}>
        <CustomFilterDateInput source="date_gte" alwaysOn />
        <CustomFilterDateInput source="date_lte" alwaysOn />
    </Filter>
);

const InvoiceList = (props: any) => (
    <List {...props} filters={<ListFilters />} perPage={25}>
        <Datagrid rowClick="expand" expand={<InvoiceShow />}>
            <TextField source="id" />
            {/* <DateField source="date" /> */}
            <FunctionField
                source="date"
                render={(record:any) => <CustomDateField source={record.date} />}
            />
            <ReferenceField source="customer_id" reference="customers">
                {/* <FullNameField /> */}
            </ReferenceField>
            <ReferenceField
                source="customer_id"
                reference="customers"
                link={false}
                label="resources.invoices.fields.address"
            >
                {/* <AddressField /> */}
            </ReferenceField>
            <ReferenceField source="command_id" reference="commands">
                <TextField source="reference" />
            </ReferenceField>
            <NumberField source="total_ex_taxes" />
            <NumberField source="delivery_fees" />
            <NumberField source="taxes" />
            <NumberField source="total" />
        </Datagrid>
    </List>
);

export default InvoiceList;
