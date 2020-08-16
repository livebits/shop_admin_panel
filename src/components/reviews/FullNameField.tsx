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

const FullNameField: FC<Props> = ({ record, size }) => {
    const classes = useStyles();
    return record ? (
        <div className={classes.root}>
            <AvatarField
                className={classes.avatar}
                record={record}
                size={size}
            />
            {/* <Link to={`/customers/${record.id}`}> */}
                {record.firstName} {record.lastName}
            {/* </Link> */}
        </div>
    ) : null;
};

FullNameField.defaultProps = {
    source: 'lastName',
    label: 'resources.customers.fields.name',
};

export default memo<Props>(FullNameField);
