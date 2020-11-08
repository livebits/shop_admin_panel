import * as React from 'react';
import { FC, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { FieldProps, Customer } from '../../types';
import { Link } from 'react-router-dom';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(1),
        marginTop: -theme.spacing(0.5),
        marginBottom: -theme.spacing(0.5),
    },
}));

interface Props extends FieldProps<Customer> {
    size?: string;
}

const ProductPriceField: FC<Props> = ({ record, size }) => {
    const classes = useStyles();
    return record ? (
        <div className={classes.root}>
            {record.name}
            <Chip label={`قیمت: ${record.price}`} />
        </div>
    ) : null;
};

ProductPriceField.defaultProps = {
    source: 'priceName',
    label: 'resources.products.priceFields.color',
};

export default memo<Props>(ProductPriceField);
