import { styled, Box } from '@mui/material';

type LayoutProps = {
    children: React.ReactNode;
};

const StyledLayout = styled(Box)`
    height: 100vh;
    width: 100vw;
    background-color: black;
`;

const StyledContentContainer = styled('div')`
    height: 100%;
    width: 100%;
    background-color: black;
`;

function AdminLayout() {
    return (
        <StyledLayout/>
    )
}

export default AdminLayout;
