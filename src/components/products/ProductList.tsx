import * as React from 'react';
import { FC } from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { InputProps } from 'ra-core';
import {
    Filter,
    List,
    usePermissions,
    Pagination,
    ReferenceInput,
    SearchInput,
    SelectInput,
    useTranslate,
} from 'react-admin';
import { FilterProps, ListComponentProps } from '../../types';
import GridList from './GridList';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const useQuickFilterStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(3),
    },
}));

const QuickFilter: FC<InputProps> = ({ label }) => {
    const translate = useTranslate();
    const classes = useQuickFilterStyles();
    return <Chip className={classes.root} label={translate(label)} />;
};

interface FilterParams {
    q?: string;
    category_id?: string;
    // width_gte?: number;
    // width_lte?: number;
    // height_gte?: number;
    // height_lte?: number;
    // stock_lte?: number;
}

export const ProductFilter: FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="name" alwaysOn />
        <ReferenceInput
            label="resources.products.filters.category"
            source="categoryId||eq"
            reference="categories"
            alwaysOn
            default={null}
            sort={{ field: 'id', order: 'ASC' }}
        >
            <SelectInput source="name" />
        </ReferenceInput>
        {/* <NumberInput source="width_gte" />
        <NumberInput source="width_lte" />
        <NumberInput source="height_gte" />
        <NumberInput source="height_lte" />
        <QuickFilter
            label="resources.products.fields.stock_lte"
            source="stock_lte"
            defaultValue={10}
        /> */}
    </Filter>
);

const ProductList: FC<ListComponentProps> = props => {
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'product', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <List
        {...props}
        filters={<ProductFilter />}
        perPage={25}
        pagination={<Pagination rowsPerPageOptions={[10, 25, 40]} />}
        sort={{ field: 'id', order: 'DESC' }}
    >
        <GridList />
    </List>
}

export default ProductList;
