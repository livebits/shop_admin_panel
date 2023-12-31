import * as React from 'react';
import { useMemo } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import { useTranslate, useQueryWithStore } from 'react-admin';

import CardWithIcon from './CardWithIcon';
import { Customer } from '../types';
import { API_URL } from '../App';

const NewCustomers = () => {
    const translate = useTranslate();
    const aMonthAgo = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }, []);

    const { loaded, data: visitors } = useQueryWithStore({
        type: 'getList',
        resource: 'customers',
        payload: {
            filter: {
                // has_ordered: true,
                'createdAt||gte': aMonthAgo.toISOString(),
                'type||eq': 'customer',
            },
            sort: { field: 'createdAt', order: 'DESC' },
            pagination: { page: 1, perPage: 100 },
        },
    });

    if (!loaded) return null;

    const nb = visitors ? visitors.reduce((nb: number) => ++nb, 0) : 0;
    return (
        <CardWithIcon
            to="/customers"
            icon={CustomerIcon}
            title={translate('pos.dashboard.new_customers')}
            subtitle={nb}
        >
            <List>
                {visitors
                    ? visitors.map((record: Customer) => (
                          <ListItem
                              button
                              to={`/customers/${record.id}`}
                              component={Link}
                              key={record.id}
                          >
                              <ListItemAvatar>
                                  <Avatar src={`${API_URL}/${record.avatar}`} />
                              </ListItemAvatar>
                              <ListItemText
                                  primary={`${record.firstName} ${
                                      record.lastName
                                  }`}
                              />
                          </ListItem>
                      ))
                    : null}
            </List>
        </CardWithIcon>
    );
};

export default NewCustomers;
