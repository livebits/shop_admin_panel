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
    NumberInput,
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
    categoryId?: string;
    brandId?: string;
    status?: string;
    // width_gte?: number;
    // width_lte?: number;
    // height_gte?: number;
    // height_lte?: number;
    // stock_lte?: number;
}

export const ProductFilter: FC<FilterProps<FilterParams>> = props => {
    const translate = useTranslate();

    return <Filter {...props}>
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
        <SelectInput
            source="status||eq"
            alwaysOn
            label="resources.products.filters.status"
            choices={[
                { id: 'available', name: translate('pos.productStatus.available') },
                { id: 'not_available', name: translate('pos.productStatus.not_available') },
            ]}
        />
        <ReferenceInput
            label="resources.products.filters.brand"
            source="brandId||eq"
            reference="brands"
            default={null}
            sort={{ field: 'id', order: 'ASC' }}
        >
            <SelectInput source="name" />
        </ReferenceInput>
        <NumberInput source="prices.price||gte" label="resources.products.filters.minPrice" defaultValue={0} />
        <NumberInput source="prices.price||lte" label="resources.products.filters.maxPrice" defaultValue={10000000} />
    </Filter>
};

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
