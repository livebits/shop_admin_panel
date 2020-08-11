import * as React from 'react';
import { FC } from 'react';
import { EditButton, DeleteWithConfirmButton, List } from 'react-admin';
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
import { Category } from '../../types';

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

const CategoryGrid: FC<ListControllerProps<Category>> = props => {
    const classes = useStyles(props);
    const { data, ids } = props;
    
    return ids ? (
        <Grid container spacing={2} className={classes.root}>
            {ids.map(id => (
                <Grid key={id} xs={12} sm={6} md={4} lg={3} xl={2} item>
                    <Card>
                        <CardMedia
                            image={`https://marmelab.com/posters/people-2.jpeg`}
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
                            <EditButton
                                basePath="/categories"
                                record={data[id]}
                            />
                            <DeleteWithConfirmButton
                                resource="categories"
                                basePath="/categories"
                                record={data[id]}
                            />
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    ) : null;
};

const CategoryList = (props: any) => (
    <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={20}
        component="div"
        // actions={false}
    >
        {/* 
        // @ts-ignore */}
        <CategoryGrid />
    </List>
);

export default CategoryList;
