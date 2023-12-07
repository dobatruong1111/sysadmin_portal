import { useMemo } from 'react';
import { MyTreeView } from '../../../components';
import { IRenderTree } from '../../../components';

const sidebarNodes = {
        hospital_list: {
            id: 'HOSTPITAL_LIST',
            label: 'Danh sách Bệnh viện',
            route: null
        },
        pacs_domain: {
            id: 'PACS_DOMAIN',
            label: 'Tên miền PACS',
            route: null
        },
        pacs_connection_account: {
            id: 'PACS_CONNECTION_ACCOUNT',
            label: 'Tài khoản kết nối PACS',
            route: null
        },
        properties_for_config: {
            id: 'PROPERTIES_FOR_CONFIG',
            label: 'Thuộc tính cho cấu hình',
            route: null
        },
        type_scan: {
            id: 'TYPE_SCAN',
            label: 'Tên loại ca chụp',
            route: null
        },
        part_name: {
            id: 'PART_NAME',
            label: 'Tên bộ phận chụp',
            route: null
        },
        type_of_consumables: {
            id: 'TYPE_OF_CONSUMABLES',
            label: 'Loại vật tư tiêu hao',
            route: null
        },
        type_of_statistical_report: {
            id: 'TYPE_OF_STATISTICAL_REPORT',
            label: 'Loại báo cáo thống kê',
            route: null
        },
        extended_functionality: {
            id: 'EXTENDED_FUNCTIONALITY',
            label: 'Chức năng mở rộng',
            route: null
        }
}

export function AdminSidebar() {
    const trees = useMemo<IRenderTree[]>(() => [
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.hospital_list.id,
                label: sidebarNodes.hospital_list.label,
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.pacs_domain.id,
                label: sidebarNodes.pacs_domain.label
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.pacs_connection_account.id,
                label: sidebarNodes.pacs_connection_account.label
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.properties_for_config.id,
                label: sidebarNodes.properties_for_config.label
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.type_scan.id,
                label: sidebarNodes.type_scan.label
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.part_name.id,
                label: sidebarNodes.part_name.label
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.type_of_consumables.id,
                label: sidebarNodes.type_of_consumables.label
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.type_of_statistical_report.id,
                label: sidebarNodes.type_of_statistical_report.label
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.extended_functionality.id,
                label: sidebarNodes.extended_functionality.label
            }
        },
    ], [])

    return (
        <MyTreeView 
            trees={trees}
        />
    )
}