import * as React from "react";
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Report';
import History from '@material-ui/icons/History';
import { Title, useTranslate } from 'react-admin';

const ACLError = ({
    ...rest
}) => {
    const translate = useTranslate();
    return (
        <div>
            <Title title="Error" />
            <h1><ErrorIcon /> Something Went Wrong </h1>
            <div>You can't access to this page.</div>
        </div>
    );
};

export default ACLError;