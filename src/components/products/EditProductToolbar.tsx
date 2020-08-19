import * as React from 'react';
import { Fragment, FC } from 'react';
import MuiToolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

import { SaveButton, DeleteButton } from 'react-admin';
import { ToolbarProps, Review, Product } from '../../types';
import { SaveAndUploadButton } from './SaveAndUploadButton';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

const EditProductToolbar: FC<ToolbarProps<Product>> = ({
    basePath,
    handleSubmitWithRedirect,
    invalid,
    record,
    resource,
    saving,
}) => {
    const classes = useStyles();

    if (!record) return null;
    return (
        <MuiToolbar className={classes.root}>
            <Fragment>
                <SaveAndUploadButton
                    handleSubmitWithRedirect={handleSubmitWithRedirect}
                    invalid={invalid}
                    saving={saving}
                    // redirect="list"
                    submitOnEnter={true}
                    record={record}
                    resource={resource}
                    basePath={basePath}
                />
            </Fragment>
        </MuiToolbar>
    );
};

export default EditProductToolbar;
