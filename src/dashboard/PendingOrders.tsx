import * as React from 'react';
import { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useTranslate } from 'react-admin';
import { Customer, Order } from '../types';
import { API_URL } from '../App';

interface Props {
    orders?: Order[];
    customers?: { [key: string]: Customer };
}

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
    },
    cost: {
        marginRight: '1em',
        color: theme.palette.text.primary,
    },
}));

const PendingOrders: FC<Props> = ({ orders = [], customers = {} }) => {
    const classes = useStyles();
    const translate = useTranslate();
    return (
        <Card className={classes.root}>
            <CardHeader title={translate('pos.dashboard.pending_orders')} />
            <List dense={true}>
                {orders.map(record => (
                    <ListItem
                        key={record.id}
                        button
                        component={Link}
                        to={`/orders/${record.id}`}
                    >
                        <ListItemAvatar>
                            {customers[record.customer.user.id] ? (
                                <Avatar src={`${API_URL}/public/users/${customers[record.customer.user.id].avatar}`} />
                            ) : (
                                <Avatar />
                            )}
                        </ListItemAvatar>
                        <ListItemText
                            primary={new Date(record.createdAt).toLocaleString(
                                'en-GB'
                            )}
                            secondary={translate('pos.dashboard.order.items', {
                                smart_count: record.orderProducts.length,
                                nb_items: record.orderProducts.length,
                                customer_name: customers[record.customer.user.id]
                                    ? `${
                                          customers[record.customer.user.id]
                                              .firstName
                                      } ${
                                          customers[record.customer.user.id]
                                              .lastName
                                      }`
                                    : '',
                            })}
                        />
                        <ListItemSecondaryAction>
                            <span className={classes.cost}>
                                {record.factor ? record.factor.orderPrice : 0}$
                            </span>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};

export default PendingOrders;
