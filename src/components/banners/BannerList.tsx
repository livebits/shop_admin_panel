import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Datagrid, TextField, Filter, FunctionField, SearchInput, usePermissions, EditButton, List, UrlField, DeleteButton, NumberField } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { FilterProps } from '../../types';
import AvatarField from '../reviews/AvatarField';
import BannerImage from './BannerImage';

interface FilterParams {
    name?: string;
}

export const ListFilter: React.FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="link" alwaysOn />
    </Filter>
);

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


const BannerList = (props: any) => {
    const { permissions } = usePermissions();
    const classes = useStyles();
    const hasPerm = hasPermissions(permissions, [{ resource: 'banner', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        filters={<ListFilter />}
        perPage={25}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <FunctionField
                source="filename"
                render={(record:any) =>  
                    <BannerImage
                        className={classes.avatar}
                        record={record}
                        size={"60"}
                    />
                }
            />
            <NumberField source="priority" />
            <UrlField source="link" />
            {/* <TextField source="description" /> */}
            {
                hasPermissions(permissions, [{ resource: 'banner', action: 'update' }]) && 
                <EditButton />
            } 
            {
                hasPermissions(permissions, [{ resource: 'banner', action: 'delete' }]) && 
                <DeleteButton />
            }
        </Datagrid>
    </List>
}

export default BannerList;
