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
        <div style={{ textAlign: 'center' }}>
            <Title title="pos.error.aclError" />
            <h2>
                <ErrorIcon color="error" />
                دسترسی غیرمجاز
            </h2>
            <div>شما اجازه دسترسی به این بخش را ندارید.</div>
        </div>
    );
};

export default ACLError;