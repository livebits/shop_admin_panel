import * as React from 'react';
import { FC } from 'react';
import { Datagrid, DateField, TextField, FunctionField, useTranslate } from 'react-admin';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ProductReferenceField from '../products/ProductReferenceField';
import CustomerReferenceField from './CustomerReferenceField';
import StarRatingField from './StarRatingField';

import rowStyle from './rowStyle';
import { DatagridProps } from '../../types';
import { Identifier } from 'ra-core';
import FullNameField from './FullNameField';
import ProductNameField from './ProductNameField';

const useListStyles = makeStyles({
    headerRow: {
        borderLeftColor: 'white',
        borderLeftWidth: 5,
        borderLeftStyle: 'solid',
    },
    headerCell: {
        padding: '6px 8px 6px 8px',
    },
    rowCell: {
        padding: '6px 8px 6px 8px',
    },
    comment: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});

export interface ReviewListDesktopProps extends DatagridProps {
    selectedRow?: Identifier;
}

const ReviewListDesktop: FC<ReviewListDesktopProps> = ({
    selectedRow,
    ...props
}) => {
    const translate = useTranslate();
    const classes = useListStyles();
    const theme = useTheme();
    return (
        <Datagrid
            rowClick="edit"
            rowStyle={selectedRow ? rowStyle(selectedRow, theme) : undefined}
            classes={{
                headerRow: classes.headerRow,
                headerCell: classes.headerCell,
                rowCell: classes.rowCell,
            }}
            optimized
            {...props}
        >
            <DateField source="createdAt" />

            <FunctionField
                source="customer"
                render={(record:any) => <FullNameField record={record.customer.user} />}
            />

            <FunctionField
                source="product"
                render={(record:any) => <ProductNameField record={record.product} />}
            />

            <StarRatingField size="small" />
            <TextField source="comment" cellClassName={classes.comment} />
            <TextField source="status" />
            <FunctionField
                source="status"
                render={(record:any) => translate(`resources.product-comments.status.${record.status}`)}
            />
        </Datagrid>
    );
};

export default ReviewListDesktop;
