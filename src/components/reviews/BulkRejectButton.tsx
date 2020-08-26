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
    const unselectAll = useUnselectAll('comments');

    const [reject, { loading }] = useUpdateMany(
        'comments',
        selectedIds,
        { status: 'rejected' },
        {
            action: CRUD_UPDATE_MANY,
            undoable: true,
            onSuccess: () => {
                notify(
                    'resources.comments.notification.approved_success',
                    'info',
                    {},
                    true
                );
                redirectTo('/comments');
                unselectAll();
            },
            onFailure: () => {
                notify(
                    'resources.comments.notification.approved_error',
                    'warning'
                );
            },
        }
    );

    return (
        <Button
            label="resources.comments.action.reject"
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
