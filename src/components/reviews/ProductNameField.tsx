import * as React from 'react';
import { FC, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AvatarField from './AvatarField';
import { FieldProps, Customer } from '../../types';
import { Link } from 'react-router-dom';

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

const ProductNameField: FC<Props> = ({ record, size }) => {
    const classes = useStyles();
    return record ? (
        <div className={classes.root}>
            {/* <Link to={`/products/${record.id}`}> */}
                {record.name}
            {/* </Link> */}
        </div>
    ) : null;
};

ProductNameField.defaultProps = {
    source: 'lastName',
    label: 'resources.customers.fields.name',
};

export default memo<Props>(ProductNameField);
