import * as React from 'react';
import { FC } from 'react';
import { EditButton, Filter, SearchInput, DeleteWithConfirmButton, List, usePermissions } from 'react-admin';
import { ListControllerProps } from 'ra-core';
import inflection from 'inflection';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import LinkToRelatedProducts from './LinkToRelatedProducts';
import { Category, FilterProps } from '../../types';
import { API_URL } from '../../App';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const useStyles = makeStyles({
    root: {
        marginTop: '1em',
    },
    media: {
        height: 140,
    },
    title: {
        paddingBottom: '0.5em',
    },
    actionSpacer: {
        display: 'flex',
        justifyContent: 'space-around',
    },
});

interface FilterParams {
    name?: string;
}

export const ListFilter: React.FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="name" alwaysOn />
    </Filter>
);

const CategoryGrid: FC<ListControllerProps<Category>> = props => {
    const { permissions } = usePermissions();
    const classes = useStyles(props);
    const { data, ids } = props;
    
    return ids ? (
        <Grid container spacing={2} className={classes.root}>
            {ids.map(id => (
                <Grid key={id} xs={12} sm={6} md={4} lg={3} xl={2} item>
                    <Card>
                        <CardMedia
                            image={`${API_URL}/public/categories/${data[id].avatar}`}
                            className={classes.media}
                        />
                        <CardContent className={classes.title}>
                            <Typography
                                variant="h5"
                                component="h2"
                                align="center"
                            >
                                {inflection.humanize(data[id].name)}
                            </Typography>
                        </CardContent>
                        <CardActions
                            classes={{ spacing: classes.actionSpacer }}
                        >
                            <LinkToRelatedProducts record={data[id]} />
                            {
                                hasPermissions(permissions, [{ resource: 'category', action: 'update' }]) && 
                                <EditButton
                                    basePath="/categories"
                                    record={data[id]}
                                />
                            } 
                            {
                                hasPermissions(permissions, [{ resource: 'category', action: 'delete' }]) && 
                                <DeleteWithConfirmButton
                                    resource="categories"
                                    basePath="/categories"
                                    record={data[id]}
                                />
                            }
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    ) : null;
};

const CategoryList = (props: any) => {
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'category', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        filters={<ListFilter />}
        perPage={25}
        component="div"
        // actions={false}
    >
        {/* 
        // @ts-ignore */}
        <CategoryGrid />
    </List>
}

export default CategoryList;
