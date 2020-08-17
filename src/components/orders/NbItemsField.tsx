import * as React from 'react';
import { FC } from 'react';
import { FunctionField } from 'react-admin';
import { Order, FieldProps } from '../../types';

const render = (record: Order) => record.orderProducts.length;

interface NbItemsFieldProps extends FieldProps {
    textAlign?: string;
}

const NbItemsField: FC<NbItemsFieldProps> = props => (
    <FunctionField {...props} render={render} />
);

NbItemsField.defaultProps = {
    label: 'سبد خرید',
    textAlign: 'right',
};

export default NbItemsField;
