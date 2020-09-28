import * as React from 'react';
import { usePermissions, Datagrid, Filter, SearchInput, TextInput, TextField, EmailField, DateField, EditButton, List, FunctionField, DeleteButton, useTranslate, } from 'react-admin';
import { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { BulkDeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { FilterProps } from '../../types';
import CustomDateField from '../commons/CustomDateField';
import CustomDateTimeField from '../commons/CustomDateTimeField';
import { makeStyles } from '@material-ui/core';
import UserLogo from './UserLogo';
// import ResetViewsButton from './ResetViewsButton';

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

const BulkActionButtons = (props: any) => (
    <Fragment>
        {/* <ResetViewsButton label="Reset Views" {...props} /> */}
        {/* default bulk delete action */}
        <BulkDeleteButton {...props} />
    </Fragment>
);

interface FilterParams {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
}

export const ListFilter: React.FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="firstName" alwaysOn />
        <TextInput source="email" />
        <TextInput source="username" />
    </Filter>
);

const UserList = (props: any) => {
    const translate = useTranslate();
    const { permissions } = usePermissions();
    const classes = useStyles();
    const hasPerm = hasPermissions(permissions, [{ resource: 'user', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        filter={{ 'type||eq': 'customer' }}
        filters={<ListFilter />}
        perPage={25}
        // actions={false}
        // title="مشتریان"
        bulkActionButtons={<BulkActionButtons />}
    >
        <Datagrid rowClick="edit">
            <FunctionField
                render={(record:any) =>  
                    <UserLogo
                        className={classes.avatar}
                        record={record}
                        size={"40"}
                    />
                }
            />
            <TextField source="id" />
            {/* <DateField source="createdAt" /> */}
            <FunctionField
                source="createdAt"
                render={(record:any) => <CustomDateField source={record.createdAt} />}
            />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="username" />
            <EmailField source="email" />
            <FunctionField
                source="status"
                render={(record:any) => record.status === 'active' ? translate('pos.status.active') : translate('pos.status.inactive')}
            />
            {/* <TextField source="lastLogin" /> */}
            <FunctionField
                source="lastLogin"
                render={(record:any) => <CustomDateTimeField source={record.lastLogin} />}
            />
            {
                hasPermissions(permissions, [{ resource: 'user', action: 'update' }]) && 
                <EditButton />
            } 
            {
                hasPermissions(permissions, [{ resource: 'user', action: 'delete' }]) && 
                <DeleteButton />
            }
        </Datagrid>
    </List>
}

export default UserList;
