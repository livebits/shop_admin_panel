import * as React from 'react';
import { FC } from 'react';
import {
    AutocompleteInput,
    DateInput,
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
    const classes = useFilterStyles();
    return (
        <Filter {...props}>
            <SearchInput source="q" alwaysOn />
            <SelectInput
                source="status||eq"
                choices={[
                    { id: 'approved', name: 'Approved' },
                    { id: 'pending', name: 'Pending' },
                    { id: 'rejected', name: 'Rejected' },
                ]}
                className={classes.status}
            />
            <ReferenceInput source="customerId||eq" reference="customers">
                <AutocompleteInput
                    optionText={(choice: Customer) =>
                        `${choice.firstName} ${choice.lastName}`
                    }
                />
            </ReferenceInput>
            <ReferenceInput source="productId||eq" reference="products">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            {/* <DateInput source="date_gte" />
            <DateInput source="date_lte" /> */}
        </Filter>
    );
};

export default ReviewFilter;
