import * as React from 'react';
import { FC } from 'react';
import PropTypes from 'prop-types';
import ThumbDown from '@material-ui/icons/ThumbDown';
import {
    Button,
    useUpdateMany,
    useNotify,
    useRedirect,
    useUnselectAll,
    CRUD_UPDATE_MANY,
} from 'react-admin';
import { BulkActionProps } from '../../types';

const BulkRejectButton: FC<BulkActionProps> = ({ selectedIds }) => {
    const notify = useNotify();
    const redirectTo = useRedirect();
    const unselectAll = useUnselectAll('product-comments');

    const [reject, { loading }] = useUpdateMany(
        'product-comments',
        selectedIds,
        { status: 'rejected' },
        {
            action: CRUD_UPDATE_MANY,
            undoable: true,
            onSuccess: () => {
                notify(
                    'resources.product-comments.notification.approved_success',
                    'info',
                    {},
                    true
                );
                redirectTo('/product-comments');
                unselectAll();
            },
            onFailure: () => {
                notify(
                    'resources.product-comments.notification.approved_error',
                    'warning'
                );
            },
        }
    );

    return (
        <Button
            label="resources.product-comments.action.reject"
            onClick={reject}
            disabled={loading}
        >
            <ThumbDown />
        </Button>
    );
};

BulkRejectButton.propTypes = {
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BulkRejectButton;
