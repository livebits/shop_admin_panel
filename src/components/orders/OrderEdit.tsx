import * as React from 'react';
import { FC } from 'react';
import {
    AutocompleteInput,
    BooleanInput,
    TextInput,
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    usePermissions,
    TextField,
    useTranslate,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { Order, Customer, EditComponentProps } from '../../types';

import Basket from './Basket';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { Divider } from '@material-ui/core';
import { CustomDateInput } from '../commons/CustomDatePicker';

interface OrderTitleProps {
    record?: Order;
}

const OrderTitle: FC<OrderTitleProps> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.orders.title', {
                id: record.id,
            })}
        </span>
    ) : null;
};

const useEditStyles = makeStyles({
    root: { alignItems: 'flex-start' },
});

const StatusSelection = (props:any) => {
    const translate = useTranslate();
    let record = props.record;
    if (record.logs && record.logs.length > 0) {
        record.status = record.logs[record.logs.length - 1].status
    } else {
        record.status = 'pending'
    }
        
    return (
        <SelectInput
            source="status"
            name="status"
            value={record.status}
            label="resources.orders.fields.status"
            choices={[
                { id: 'pending', name: translate('pos.orderStatus.pending') },
                { id: 'accepted', name: translate('pos.orderStatus.accepted') },
                { id: 'ready_to_send', name: translate('pos.orderStatus.ready_to_send') },
                { id: 'posted', name: translate('pos.orderStatus.posted') },
                { id: 'delivered', name: translate('pos.orderStatus.delivered') },
                { id: 'cancelled', name: translate('pos.orderStatus.cancelled') },
                {
                    id: 'unknown',
                    name: translate('pos.orderStatus.unknown'),
                    disabled: true,
                },
            ]}
        />
    );
};

const OrderEdit: FC<EditComponentProps> = props => {
    const translate = useTranslate();
    const classes = useEditStyles();
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'order', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    const transform = (data:any) => {
        let requestBody = {
            ...data,
        }
        delete requestBody.updatedAt;

        return requestBody;
    };

    return (
        <Edit
            title={<OrderTitle />}
            aside={<Basket />}
            classes={classes}
            transform={transform}
            {...props}
        >
            <SimpleForm>
                <CustomDateInput source="createdAt" label="resources.orders.fields.createdAt" />
                <ReferenceInput disabled source="customerId" reference="user-tenants">
                    <AutocompleteInput
                        optionText={(choice: Customer) =>
                            `${choice.user.firstName} ${choice.user.lastName}`
                        }
                    />
                </ReferenceInput>
                <SelectInput
                    source="status"
                    label="resources.orders.fields.status"
                    choices={[
                        { id: 'pending', name: translate('pos.orderStatus.pending') },
                        { id: 'accepted', name: translate('pos.orderStatus.accepted') },
                        { id: 'ready_to_send', name: translate('pos.orderStatus.ready_to_send') },
                        { id: 'posted', name: translate('pos.orderStatus.posted') },
                        { id: 'delivered', name: translate('pos.orderStatus.delivered') },
                        { id: 'cancelled', name: translate('pos.orderStatus.cancelled') },
                        {
                            id: 'unknown',
                            name: translate('pos.orderStatus.unknown'),
                            disabled: true,
                        },
                    ]}
                />
                <BooleanInput source="returned" />
                <SelectInput
                    source="paymentType"
                    label="resources.orders.fields.paymentType"
                    choices={[
                        { id: 'online', name: translate('pos.orderPaymentType.online') },
                        { id: 'cash', name: translate('pos.orderPaymentType.cash') },
                        { id: 'card', name: translate('pos.orderPaymentType.card') },
                    ]}
                />
                <SelectInput
                    source="shipmentType"
                    label="resources.orders.fields.shipmentType"
                    choices={[
                        { id: 'express', name: translate('pos.orderShipmentType.express') },
                        { id: 'custom_post', name: translate('pos.orderShipmentType.custom_post') },
                        { id: 'courier', name: translate('pos.orderShipmentType.courier') },
                        { id: 'alopeik', name: translate('pos.orderShipmentType.alopeik') },
                        { id: 'tipax', name: translate('pos.orderShipmentType.tipax') },
                    ]}
                />
                <TextInput fullWidth multiline source="description" />

                <Divider variant="fullWidth" style={{width: 'auto'}} />

                <TextField label="resources.user-addresses.fields.address" source="userAddress.address" />
                <TextField label="resources.user-addresses.fields.mobile" source="userAddress.mobile" />
                <TextField label="resources.user-addresses.fields.state" source="userAddress.state" />
                <TextField label="resources.user-addresses.fields.city" source="userAddress.city" />
                <TextField label="resources.user-addresses.fields.zip" source="userAddress.zip" />

            </SimpleForm>
        </Edit>
    );
};

export default OrderEdit;
