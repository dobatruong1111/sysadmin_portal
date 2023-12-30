import { useEffect } from 'react';
import { AdminProvider } from '../../../../providers/admin/AdminProvider';
import { Domain } from '../../components/domain/Domain';
import { ConnectedDomainCreateModal } from '../../components/domain/DomainCreateModal';
import { useDispatch } from 'react-redux';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { TABLE_DOMAIN } from '../../../../stores/table/tableInitialState';

export const AdminDomain = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clean function
    return () => {
      dispatch(
        setSelectedRow({
          tableId: TABLE_DOMAIN,
          selectedRow: null,
        })
      );
    };
  }, []);

  return (
    <AdminProvider>
      <Domain />
      <ConnectedDomainCreateModal />
    </AdminProvider>
  );
};
