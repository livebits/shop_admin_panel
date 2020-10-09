import * as React from 'react';
import { FC } from 'react';
import classnames from 'classnames';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link, useTranslate, useQueryWithStore } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { FieldProps, AppState, Order, Product } from '../../types';

const useStyles = makeStyles({
    container: { minWidth: '35em', marginLeft: '1em' },
    rightAlignedCell: { textAlign: 'right' },
    boldCell: { fontWeight: 'bold' },
});

const Basket: FC<FieldProps<Order>> = ({ record }) => {
    const classes = useStyles();
    const translate = useTranslate();

    if (!record) return null;

    return (
        <Paper className={classes.container} elevation={2}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {translate(
                                'resources.orders.fields.factor.productName'
                            )}
                        </TableCell>
                        <TableCell className={classes.rightAlignedCell}>
                            {translate(
                                'resources.orders.fields.factor.unitPrice'
                            )}
                        </TableCell>
                        <TableCell className={classes.rightAlignedCell}>
                            {translate(
                                'resources.orders.fields.factor.quantity'
                            )}
                        </TableCell>
                        <TableCell className={classes.rightAlignedCell}>
                            {translate(
                                'resources.orders.fields.factor.sum'
                            )}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {record.orderProducts.map(
                        (item: any) =>
                            item.product && (
                                <TableRow key={item.productId}>
                                    <TableCell>
                                        <Link
                                            to={`/products/${item.product.id}`}
                                        >
                                            {
                                                item.product.name
                                            }
                                        </Link>
                                    </TableCell>
                                    <TableCell
                                        className={classes.rightAlignedCell}
                                    >
                                        {item.productPrice.price.toLocaleString(undefined, {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                    </TableCell>
                                    <TableCell
                                        className={classes.rightAlignedCell}
                                    >
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell
                                        className={classes.rightAlignedCell}
                                    >
                                        {(
                                            item.productPrice.price *
                                            item.quantity
                                        ).toLocaleString(undefined, {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                    </TableCell>
                                </TableRow>
                            )
                    )}
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell>
                            {translate(
                                'resources.orders.fields.factor.productsPrice'
                            )}
                        </TableCell>
                        <TableCell className={classes.rightAlignedCell}>
                            {record.factor && record.factor.orderPrice.toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell>
                            {translate(
                                'resources.orders.fields.factor.discountPrice'
                            )}
                        </TableCell>
                        <TableCell className={classes.rightAlignedCell}>
                            {record.factor && record.factor.deliveryPrice.toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell>
                            {translate(
                                'resources.orders.fields.factor.deliveryPrice'
                            )}
                        </TableCell>
                        <TableCell className={classes.rightAlignedCell}>
                            0
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell className={classes.boldCell}>
                            {translate(
                                'resources.orders.fields.factor.total'
                            )}
                        </TableCell>
                        <TableCell
                            className={classnames(
                                classes.boldCell,
                                classes.rightAlignedCell
                            )}
                        >
                            {record.factor && record.factor.orderPrice.toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell className={classes.boldCell}>
                            {translate(
                                'resources.orders.fields.factor.status'
                            )}
                        </TableCell>
                        <TableCell
                            className={classnames(
                                classes.boldCell,
                                classes.rightAlignedCell
                            )}
                        >
                            {record.factor && record.factor.status === 'paid' ? translate('pos.paymentStatus.paid') : translate('pos.paymentStatus.not_paid')}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

export default Basket;
