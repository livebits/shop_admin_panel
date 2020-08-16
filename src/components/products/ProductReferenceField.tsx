import * as React from 'react';
import { FC } from 'react';
import { ReferenceField, TextField } from 'react-admin';
import { ReferenceFieldProps } from '../../types';

const ProductReferenceField: FC<
    Omit<ReferenceFieldProps, 'reference' | 'children'>
> = props => (
    <ReferenceField
        label="Product"
        source="productId"
        reference="products"
        {...props}
    >
        <TextField source="id" />
    </ReferenceField>
);

ProductReferenceField.defaultProps = {
    source: 'productId',
    addLabel: true,
};

export default ProductReferenceField;
