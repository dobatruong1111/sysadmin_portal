import { Modal } from "@mui/material";
import { AppModalContent } from "../../../../components/Elements/Modal/AppModalContent";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { useAdminFunctions, useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { ConfigAttributeCreateForm } from "./ConfigAttributeCreateForm";

export const ConnectedConfigAttributeCreateModal = () => {
    const { isOpen, open, close } = useDisclosure(false);
    const register = useRegisterAdminFunctions();
    register('openCreateModal', open);

    return (
        <Modal open={isOpen}>
            <>
                <ConfigAttributeCreateModal closeModal={close} />
            </>
        </Modal>
    )
}

export const ConfigAttributeCreateModal = (props: {closeModal: () => void}) => {
    const { closeModal } = props;
    const adminFunctions = useAdminFunctions();

    return (
        <AppModalContent
            handleClose={closeModal}
            bodyComponent={<ConfigAttributeCreateForm onSuccessCallback={closeModal} />}
            boxBodyProps={{
                padding: '8px 16px 16px 16px',
                height: '45vh'
            }}
            title="Thêm thuộc tính cấu hình"
            confirmLabel="Thêm mới"
            handleConfirm={() => adminFunctions.submitCreateForm()}
        />
    )
}
