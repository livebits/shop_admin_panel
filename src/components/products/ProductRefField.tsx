import * as React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FieldProps, Product } from '../../types';

const ProductRefField: FC<FieldProps<Product>> = ({ record }) =>
    record ? (
        <Link to={`products/${record.id}`}>{record.name}</Link>
    ) : null;

ProductRefField.defaultProps = {
    source: 'id',
    label: 'Name',
};

export default ProductRefField;
