import * as React from 'react';
import { FC, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FieldProps } from '../../types';
import { Link } from 'react-router-dom';
var moment = require('moment-jalaali');

const castDateToJalali = (date:any) => {
    console.log('DATE": ', date);
    
    return (date != null && (typeof date === 'string')) ? `${moment(date, 'YYYY-M-D').format('jYYYY/jMM/jDD')}` : ''
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(1),
        marginTop: -theme.spacing(0.5),
        marginBottom: -theme.spacing(0.5),
    },
}));

interface Props extends FieldProps {
    size?: string;
}

const CustomDateField: FC<Props> = ({ source, size }) => {
    const classes = useStyles();
    return source ? (
        <div className={classes.root}>
            
            {castDateToJalali(source)}
        </div>
    ) : null;
};

export default memo<Props>(CustomDateField);
