import * as React from 'react';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import {
    AutocompleteInput,
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    Filter,
    List,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    SearchInput,
    TextField,
    FunctionField,
    usePermissions,
    useTranslate,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../reviews/CustomerReferenceField';
import {
    Customer,
    FilterProps,
    OrderStatus,
    DatagridProps,
    Order,
    ListComponentProps,
} from '../../types';
import { Identifier } from 'ra-core';
import FullNameField from '../reviews/FullNameField';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { CustomDateInput } from '../commons/CustomDatePicker';
import { CustomFilterDateInput } from '../commons/CustomFilterDatePicker';
import CustomDateTimeField from '../commons/CustomDateTimeField';

interface FilterParams {
    q?: string;
    customerId?: string;
    date_gte?: string;
    date_lte?: string;
    total_gte?: string;
    returned?: boolean;
    status?: OrderStatus;
}

const OrderFilter: FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="id" alwaysOn />
        <ReferenceInput 
            label="resources.orders.filters.customer" 
            source="customerId||eq" 
            reference="user-tenants"
            filter={{ 'user.type||eq': 'customer' }}
        >
            <AutocompleteInput
                optionText={(choice: Customer) =>
                    choice.user ? `${choice.user.firstName} ${choice.user.lastName ?? '' }` : ''
                }
            />
        </ReferenceInput>
        <CustomFilterDateInput source="createdAt||gte" label="resources.orders.filters.minDate" />
        <CustomFilterDateInput source="createdAt||lte" label="resources.orders.filters.maxDate" />
        {/* <TextInput source="total_gte" /> */}
        <NullableBooleanInput label="resources.orders.filters.returned" source="returned||eq" />
    </Filter>
);

const useDatagridStyles = makeStyles({
    total: { fontWeight: 'bold' },
});

const tabs = [
    { id: 'ordered,pending,accepted', name: 'resources.orders.tabs.ordered' },
    { id: 'ready_to_send', name: 'resources.orders.tabs.ready_to_send' },
    { id: 'posted', name: 'resources.orders.tabs.posted' },
    { id: 'delivered', name: 'resources.orders.tabs.delivered' },
    { id: 'cancelled', name: 'resources.orders.tabs.cancelled' },
];

interface TabbedDatagridProps extends DatagridProps<Order> {}

const TabbedDatagrid: FC<TabbedDatagridProps> = ({
    ids,
    filterValues,
    setFilters,
    displayedFilters,
    ...rest
}) => {
    const translate = useTranslate();
    const { permissions } = usePermissions();
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const [ordered, setOrdered] = useState<Identifier[]>([]);
    const [readyToSend, setReadyToSend] = useState<Identifier[]>([]);
    const [posted, setPosted] = useState<Identifier[]>([]);
    const [delivered, setDelivered] = useState<Identifier[]>([]);
    const [cancelled, setCancelled] = useState<Identifier[]>([]);

    useEffect(() => {        
        let filterStatus = filterValues.status ? filterValues.status : filterValues['status||in']
        if (ids && ids !== filterStatus) {
            switch (filterStatus) {
                case 'ordered,pending,accepted':
                    setOrdered(ids);
                    break;
                case 'ready_to_send':
                    setReadyToSend(ids);
                    break;
                case 'posted':
                    setPosted(ids);
                    break;
                case 'delivered':
                    setDelivered(ids);
                    break;
                case 'cancelled':
                    setCancelled(ids);
                    break;
            }
        }
    }, [ids, filterValues['status||in']]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<{}>, value: any) => {
            // if (value === 'ordered') {
            //     value = 'ordered,pending,accepted,ready_to_send'
            // }
            
            setFilters &&
                setFilters(
                    { ...filterValues, 'status||in': value },
                    `${displayedFilters}||in`
                );
        },
        [`${displayedFilters}||in`, filterValues, setFilters]
    );

    const selectedIds =
        filterValues['status||in'] === 'ordered,pending,accepted,ready_to_send'
            ? ordered
            : filterValues['status||in'] === 'posted'
            ? posted
            : filterValues['status||in'] === 'delivered'
            ? delivered
            : cancelled;

    return (
        <Fragment>
            <Tabs
                variant="fullWidth"
                centered
                value={filterValues['status||in']}
                indicatorColor="primary"
                onChange={handleChange}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={translate(choice.name)}
                        value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider />
            {
                <div>
                    {(filterValues['status||in'] === 'ordered,pending,accepted' || filterValues['status||in'] === 'ready_to_send' || filterValues['status||in'] === 'posted') && (
                        <Datagrid
                            {...rest}
                            ids={filterValues['status||in'] === 'ordered,pending,accepted' ? ordered : filterValues['status||in'] === 'ready_to_send' ? readyToSend : posted}
                            optimized
                            rowClick="edit"
                        >
                            {/* <DateField source="createdAt" showTime /> */}
                            <FunctionField
                                source="createdAt"
                                render={(record:any) => <CustomDateTimeField source={record.createdAt} />}
                            />
                            <TextField source="id" />
                            <FunctionField
                                source="customer"
                                render={(record:any) => <FullNameField record={record.customer ? record.customer.user : ''} />}
                            />
                            <NbItemsField />
                            <NumberField
                                source="factor.orderPrice"
                                // options={{
                                //     style: 'currency',
                                //     currency: 'USD',
                                // }}
                                className={classes.total}
                            />
                            <FunctionField
                                source="shipmentType"
                                render={(record:any) => translate(`pos.orderShipmentType.${record.shipmentType}`)}
                            />
                        </Datagrid>
                    )}
                    {filterValues['status||in'] === 'delivered' && (
                        <Datagrid {...rest} ids={delivered} rowClick="edit">
                            {/* <DateField source="createdAt" showTime /> */}
                            <FunctionField
                                source="createdAt"
                                render={(record:any) => <CustomDateTimeField source={record.createdAt} />}
                            />
                            <TextField source="id" />
                            <FunctionField
                                source="customer"
                                render={(record:any) => <FullNameField record={record.customer ? record.customer.user : ''} />}
                            />
                            <NbItemsField />
                            <NumberField
                                source="factor.orderPrice"
                                // options={{
                                //     style: 'currency',
                                //     currency: 'USD',
                                // }}
                                className={classes.total}
                            />
                            <FunctionField
                                source="shipmentType"
                                render={(record:any) => translate(`pos.orderShipmentType.${record.shipmentType}`)}
                            />
                            <BooleanField source="returned" />
                        </Datagrid>
                    )}
                    {filterValues['status||in'] === 'cancelled' && (
                        <Datagrid {...rest} ids={cancelled} rowClick="edit">
                            {/* <DateField source="createdAt" showTime /> */}
                            <FunctionField
                                source="createdAt"
                                render={(record:any) => <CustomDateTimeField source={record.createdAt} />}
                            />
                            <TextField source="id" />
                            <FunctionField
                                source="customer"
                                render={(record:any) => <FullNameField record={record.customer ? record.customer.user : ''} />}
                            />
                            <NbItemsField />
                            <NumberField
                                source="factor.orderPrice"
                                // options={{
                                //     style: 'currency',
                                //     currency: 'USD',
                                // }}
                                className={classes.total}
                            />
                            <BooleanField source="returned" />
                        </Datagrid>
                    )}
                </div>
            }
        </Fragment>
    );
};

const OrderList: FC<ListComponentProps> = props => {
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'order', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <List
        {...props}
        filterDefaultValues={{ 'status||in': 'ordered,pending,accepted' }}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={25}
        filters={<OrderFilter />}
    >
        <TabbedDatagrid />
    </List>
}

export default OrderList;
