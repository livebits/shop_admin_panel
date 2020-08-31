import * as React from 'react';
import { FC } from 'react';
import { FunctionField } from 'react-admin';
import { Order, FieldProps } from '../../types';

const render = (record: Order) => record.orderProducts ? record.orderProducts.length : 0;

interface NbItemsFieldProps extends FieldProps {
    textAlign?: string;
}

const NbItemsField: FC<NbItemsFieldProps> = props => (
    <FunctionField {...props} render={render} />
);

NbItemsField.defaultProps = {
    label: 'resources.orders.fields.basketCount',
    textAlign: 'right',
};

export default NbItemsField;
