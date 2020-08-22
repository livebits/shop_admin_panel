import * as React from 'react';
import { FC } from 'react';
import {
    AutocompleteInput,
    BooleanInput,
    DateInput,
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    usePermissions,
    useTranslate,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { Order, Customer, EditComponentProps } from '../../types';

import Basket from './Basket';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

interface OrderTitleProps {
    record?: Order;
}

const OrderTitle: FC<OrderTitleProps> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.commands.title', {
                reference: record.id,
            })}
        </span>
    ) : null;
};

const useEditStyles = makeStyles({
    root: { alignItems: 'flex-start' },
});

const OrderEdit: FC<EditComponentProps> = props => {
    const classes = useEditStyles();
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'order', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }
    return (
        <Edit
            title={<OrderTitle />}
            aside={<Basket />}
            classes={classes}
            {...props}
        >
            <SimpleForm>
                <DateInput source="createdAt" />
                <ReferenceInput source="userTenantId" reference="user-tenants">
                    <AutocompleteInput
                        optionText={(choice: Customer) =>
                            `${choice.user.firstName} ${choice.user.lastName}`
                        }
                    />
                </ReferenceInput>
                <SelectInput
                    source="status"
                    choices={[
                        { id: 'delivered', name: 'delivered' },
                        { id: 'ordered', name: 'ordered' },
                        { id: 'paid', name: 'paid' },
                        { id: 'cancelled', name: 'cancelled' },
                        {
                            id: 'unknown',
                            name: 'unknown',
                            disabled: true,
                        },
                    ]}
                />
                <BooleanInput source="returned" />
            </SimpleForm>
        </Edit>
    );
};

export default OrderEdit;
