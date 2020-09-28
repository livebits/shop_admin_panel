import { Card, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { Datagrid, TextField, Filter, SearchInput, usePermissions, EditButton, List, DeleteWithConfirmButton, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { Brand, FilterProps } from '../../types';
import BrandLogo from './BrandLogo';
import { ListControllerProps } from 'ra-core';
import { API_URL } from '../../App';
import inflection from 'inflection';

interface FilterParams {
    name?: string;
}

export const ListFilter: React.FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="name" alwaysOn />
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
}));

// const BrandList = (props: any) => {
//     const { permissions } = usePermissions();
//     const classes = useStyles();
//     const hasPerm = hasPermissions(permissions, [{ resource: 'brand', action: 'read' }])
//     if (!hasPerm) {
//         return <ACLError />
//     }

//     return <List
//         {...props}
//         sort={{ field: 'id', order: 'DESC' }}
//         filters={<ListFilter />}
//         perPage={25}
//     >
//         <Datagrid rowClick="edit">
//             <FunctionField
//                 // source="logo"
//                 render={(record:any) =>  
//                     <BrandLogo
//                         className={classes.avatar}
//                         record={record}
//                         size={"40"}
//                     />
//                 }
//             />
//             <TextField source="id" />
//             <TextField source="name" />
//             <TextField source="description" />
//             {
//                 hasPermissions(permissions, [{ resource: 'brand', action: 'update' }]) && 
//                 <EditButton />
//             } 
//             {
//                 hasPermissions(permissions, [{ resource: 'brand', action: 'delete' }]) && 
//                 <DeleteButton />
//             }
//         </Datagrid>
//     </List>
// }

const BrandsGrid: React.FC<ListControllerProps<Brand>> = props => {
    const { permissions } = usePermissions();    
    const classes = useStyles(props);
    const { data, ids } = props;

    return ids ? (
        <Grid container spacing={2} className={classes.root}>
            {ids.map(id => (
                <Grid key={id} xs={12} sm={6} md={4} lg={3} xl={2} item>
                    <Card>
                        <CardMedia
                            image={`${API_URL}/${data[id].logo}`}
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
                            {/* <LinkToRelatedUsers record={data[id]} /> */}
                            {
                                hasPermissions(permissions, [{ resource: 'brand', action: 'update' }]) && 
                                <EditButton
                                    basePath="/brands"
                                    record={data[id]}
                                />
                            } 
                            {
                                hasPermissions(permissions, [{ resource: 'brand', action: 'delete' }]) && 
                                <DeleteWithConfirmButton
                                    resource="brands"
                                    basePath="/brands"
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

const BrandList = (props: any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'brand', action: 'read' }])
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
        <BrandsGrid />
    </List>
}

export default BrandList;
