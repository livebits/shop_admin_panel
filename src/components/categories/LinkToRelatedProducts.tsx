import * as React from 'react';
import { FC } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useTranslate } from 'react-admin';
import { stringify } from 'query-string';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';

// import products from '../products';
import { FieldProps, Category } from '../../types';

const useStyles = makeStyles({
    icon: { paddingRight: '0.5em' },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
});

const LinkToRelatedProducts: FC<FieldProps<Category>> = ({ record }) => {
    const translate = useTranslate();
    const classes = useStyles();
    return record ? (
        <Button
            size="small"
            color="primary"
            component={Link}
            to={{
                pathname: '/products',
                search: stringify({
                    page: 1,
                    perPage: 25,
                    sort: 'id',
                    order: 'DESC',
                    filter: JSON.stringify({ 'categoryId||eq': record.id }),
                }),
            }}
            className={classes.link}
        >
            <AppsRoundedIcon />
            {translate('resources.categories.fields.products')}
        </Button>
    ) : null;
};

export default LinkToRelatedProducts;
