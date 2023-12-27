import { forwardRef, useCallback } from 'react';
import { DomainDTOUpdate } from '../../../../types/dto/domain';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { DomainEditForm } from './DomainEditForm';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_DOMAIN } from '../../../../stores/table/tableInitialState';
import { useDeleteDomainMutation } from '../../api/apiDomain';
import {
  useNotifyModal,
  useNotifySnackbar,
} from '../../../../providers/NotificationProvider';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { Modal } from '@mui/material';

export const ConnectedDomainEditModal = () => {
  const { isOpen, open, close } = useDisclosure();
  const selectedRow = useSelector(
    (state: any) => state.tableReducer.data[TABLE_DOMAIN].selection.selectedRow
  );

  const dispatch = useDispatch();
  const [deleteDomain] = useDeleteDomainMutation();
  const notifySnackbar = useNotifySnackbar();
  const notifyModal = useNotifyModal();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const handleDeleteDomain = useCallback(() => {
    if (selectedRow) {
      notifyModal({
        message: `Bạn có chắc chắn muốn xóa tên miền ${selectedRow.id} hay không ?`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const result = await deleteDomain({ id: `${selectedRow.id}` });
            if ('error' in result) {
              notifySnackbar({
                message: 'Lỗi',
                options: {
                  variant: 'error',
                },
              });
            } else {
              notifySnackbar({
                message: 'Thành công',
                options: {
                  variant: 'success',
                },
              });
              dispatch(
                setSelectedRow({
                  tableId: TABLE_DOMAIN,
                  selectedRow: null,
                })
              );
            }
          },
        },
      });
    }
  }, [notifyModal, deleteDomain, setSelectedRow, selectedRow]);
  register('submitDelete', () => handleDeleteDomain());

  return selectedRow ? (
    <Modal open={isOpen}>
      <>
        <DomainEditModal closeModal={close} record={selectedRow} />
      </>
    </Modal>
  ) : (
    <></>
  );
};

type DomainEditModalProps = {
  closeModal: () => void;
  record: DomainDTOUpdate;
};

export const DomainEditModal = forwardRef<HTMLElement, DomainEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;
    const adminFunctions = useAdminFunctions();

    return (
      <>
        <AppModalContent
          ref={ref}
          confirmLabel="Cập nhật"
          handleConfirm={() => adminFunctions.submitEditForm()}
          handleClose={closeModal}
          bodyComponent={
            <DomainEditForm onSuccessCallback={closeModal} record={record} />
          }
          title="Sửa tên miền"
          width="30vw"
        />
      </>
    );
  }
);
