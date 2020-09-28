import * as React from 'react';
import { Datagrid, TextField, Filter, SearchInput, TextInput, EmailField, DateField, EditButton, List, FunctionField, DeleteButton, usePermissions, useTranslate } from 'react-admin';
import { UserPermissions, FilterProps } from '../../types';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import CustomDateField from '../commons/CustomDateField';
import CustomDateTimeField from '../commons/CustomDateTimeField';
import UserLogo from '../customers/UserLogo';
import { makeStyles } from '@material-ui/core';

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

const ManagerList = (props:any) => {
    const translate = useTranslate();
    const classes = useStyles();
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'user', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        filter={{ 'type||eq': 'manager' }}
        filters={<ListFilter />}
        perPage={25}
        // actions={false}
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
            {/* <EmailField source="email" /> */}
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
};

export default ManagerList;
