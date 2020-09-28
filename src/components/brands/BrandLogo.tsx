import * as React from 'react';
import { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Customer, FieldProps } from '../../types';
import { API_URL } from '../../App';

interface Props extends FieldProps<Customer> {
    className?: string;
    size?: string;
}

const BrandLogo: FC<Props> = ({ record, size = '25', className }) =>
    record ? (
        <Avatar
            src={`${API_URL}/${record.logo}`}
            style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
            className={className}
        />
    ) : null;

export default BrandLogo;
