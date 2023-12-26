import { useAdminFunctions, useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { HospitalCreateForm } from './HospitalCreateForm';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { Modal } from '@mui/material';

export const ConnectedHospitalCreateModal = () => {
    const { isOpen, open, close } = useDisclosure(false);
    const register = useRegisterAdminFunctions();
    register('openCreateModal', open);

    return (
        <Modal open={isOpen}>
            <>
                <HospitalCreateModal closeModal={close} />
            </>
        </Modal>
    )
}

export const HospitalCreateModal = (props: {closeModal: () => void}) => {
    const { closeModal } = props;
    const adminFunctions = useAdminFunctions();
    
    return (
        <AppModalContent
            handleClose={closeModal}
            bodyComponent={<HospitalCreateForm onSuccessCallback={closeModal} />}
            boxBodyProps={{
                padding: '8px 16px 16px 16px',
                height: '220px'
            }}
            title="Thêm bệnh viện"
            confirmLabel="Thêm mới"
            handleConfirm={() => adminFunctions.submitCreateForm()}
        />
    )
}
