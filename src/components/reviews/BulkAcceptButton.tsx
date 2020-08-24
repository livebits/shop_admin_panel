import * as React from 'react';
import { FC } from 'react';
import PropTypes from 'prop-types';
import ThumbUp from '@material-ui/icons/ThumbUp';
import {
    Button,
    useUpdateMany,
    useNotify,
    useRedirect,
    useUnselectAll,
    CRUD_UPDATE_MANY,
} from 'react-admin';
import { BulkActionProps } from '../../types';

const BulkAcceptButton: FC<BulkActionProps> = ({ selectedIds }) => {
    const notify = useNotify();
    const redirectTo = useRedirect();
    const unselectAll = useUnselectAll('product-comments');

    const [approve, { loading }] = useUpdateMany(
        'product-comments',
        selectedIds,
        { status: 'approved' },
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
            label="resources.product-comments.action.accept"
            onClick={approve}
            disabled={loading}
        >
            <ThumbUp />
        </Button>
    );
};

BulkAcceptButton.propTypes = {
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BulkAcceptButton;
