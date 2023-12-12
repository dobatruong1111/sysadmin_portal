import { useMemo } from 'react';
import { MyTreeView } from '../../../components';
import { IRenderTree } from '../../../components';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import { 
    ROUTE_ADMIN_HOSPITAL_LIST, 
    ROUTE_ADMIN_PACS_DOMAIN, 
    ROUTE_ADMIN_PACS_CONNECTION_ACCOUNT,
    ROUTE_ADMIN_PROPERTIES_FOR_CONFIG,
    ROUTE_ADMIN_USER_AUTHORIZATION,
    ROUTE_ADMIN_TYPE_OF_SCAN,
    ROUTE_ADMIN_PART_NAME,
    ROUTE_ADMIN_TYPE_OF_CONSUMABLES,
    ROUTE_ADMIN_TYPE_OF_STATISTICAL_REPORT,
    ROUTE_ADMIN_EXTENDED_FUNCTIONALITY
} from '..';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';

const sidebarNodes = {
    hospital_list: {
        id: 'HOSTPITAL_LIST',
        label: 'Danh sách Bệnh viện',
        route: ROUTE_ADMIN_HOSPITAL_LIST
    },
    pacs_domain: {
        id: 'PACS_DOMAIN',
        label: 'Tên miền PACS',
        route: ROUTE_ADMIN_PACS_DOMAIN
    },
    pacs_connection_account: {
        id: 'PACS_CONNECTION_ACCOUNT',
        label: 'Tài khoản kết nối PACS',
        route: ROUTE_ADMIN_PACS_CONNECTION_ACCOUNT
    },
    properties_for_config: {
        id: 'PROPERTIES_FOR_CONFIG',
        label: 'Thuộc tính cho cấu hình',
        route: ROUTE_ADMIN_PROPERTIES_FOR_CONFIG
    },
    user_authorization: {
        id: 'USER_AUTHORIZATION',
        label: 'Phân quyền người dùng',
        route: ROUTE_ADMIN_USER_AUTHORIZATION
    },
    type_of_scan: {
        id: 'TYPE_OF_SCAN',
        label: 'Tên loại ca chụp',
        route: ROUTE_ADMIN_TYPE_OF_SCAN
    },
    part_name: {
        id: 'PART_NAME',
        label: 'Tên bộ phận chụp',
        route: ROUTE_ADMIN_PART_NAME
    },
    type_of_consumables: {
        id: 'TYPE_OF_CONSUMABLES',
        label: 'Loại vật tư tiêu hao',
        route: ROUTE_ADMIN_TYPE_OF_CONSUMABLES
    },
    type_of_statistical_report: {
        id: 'TYPE_OF_STATISTICAL_REPORT',
        label: 'Loại báo cáo thống kê',
        route: ROUTE_ADMIN_TYPE_OF_STATISTICAL_REPORT
    },
    extended_functionality: {
        id: 'EXTENDED_FUNCTIONALITY',
        label: 'Chức năng mở rộng',
        route: ROUTE_ADMIN_EXTENDED_FUNCTIONALITY
    }
}

const StyledChildNodeWrapper = styled(Typography)`
    font-size: 14px;
    color: black;
`;

export function AdminSidebar() {
    const trees = useMemo<IRenderTree[]>(() => [
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.hospital_list.id,
                label: (
                    <Link to={sidebarNodes.hospital_list.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.hospital_list.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>,
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.pacs_domain.id,
                label: (
                    <Link to={sidebarNodes.pacs_domain.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.pacs_domain.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.pacs_connection_account.id,
                label: (
                    <Link to={sidebarNodes.pacs_connection_account.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.pacs_connection_account.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.properties_for_config.id,
                label: (
                    <Link to={sidebarNodes.properties_for_config.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.properties_for_config.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.user_authorization.id,
                label: (
                    <Link to={sidebarNodes.user_authorization.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.user_authorization.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.type_of_scan.id,
                label: (
                    <Link to={sidebarNodes.type_of_scan.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.type_of_scan.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.part_name.id,
                label: (
                    <Link to={sidebarNodes.part_name.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.part_name.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.type_of_consumables.id,
                label: (
                    <Link to={sidebarNodes.type_of_consumables.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.type_of_consumables.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.type_of_statistical_report.id,
                label: (
                    <Link to={sidebarNodes.type_of_statistical_report.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.type_of_statistical_report.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.extended_functionality.id,
                label: (
                    <Link to={sidebarNodes.extended_functionality.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.extended_functionality.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
    ], [])

    return (
        <MyTreeView 
            trees={trees}
        />
    )
}