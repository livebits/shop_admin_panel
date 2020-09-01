import * as React from 'react';
import { FC } from 'react';
import {
    AutocompleteInput,
    DateInput,
    useTranslate,
    Filter,
    ReferenceInput,
    SearchInput,
    SelectInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { FilterProps, ReviewStatus, Customer } from '../../types';
import { Identifier } from 'ra-core';

const useFilterStyles = makeStyles({
    status: { width: 150 },
});

interface FilterParams {
    q?: string;
    status?: ReviewStatus;
    date_gte?: string;
    date_lte?: string;
    customer_id?: Identifier;
    product_id?: Identifier;
}

const ReviewFilter: FC<FilterProps<FilterParams>> = props => {
    const translate = useTranslate();
    const classes = useFilterStyles();
    return (
        <Filter {...props}>
            <SearchInput source="comment" alwaysOn />
            <SelectInput
                source="status||eq"
                label="resources.comments.filters.status"
                choices={[
                    { id: 'approved', name: translate(`resources.comments.status.approved`) },
                    { id: 'pending', name: translate(`resources.comments.status.pending`) },
                    { id: 'rejected', name: translate(`resources.comments.status.rejected`) },
                ]}
                className={classes.status}
            />
            <ReferenceInput 
                label="resources.comments.filters.customer" 
                source="customerId||eq" 
                reference="user-tenants"
                filter={{ 'user.type||eq': 'customer' }}
            >
                <AutocompleteInput
                    optionText={(choice: Customer) =>
                        choice.user ? `${choice.user.firstName} ${choice.user.lastName ?? '' }` : ''
                    }
                />
            </ReferenceInput>
            <ReferenceInput 
                source="productId||eq" 
                reference="products"
                label="resources.comments.filters.product"
            >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            {/* <DateInput source="date_gte" />
            <DateInput source="date_lte" /> */}
        </Filter>
    );
};

export default ReviewFilter;
