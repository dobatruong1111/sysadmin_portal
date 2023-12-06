import { styled } from '@mui/material';
import * as React from 'react';

const StyledNavBarLayout = styled('div')`
    min-height: 100vh;
    min-width: 100vw;
    max-width: 100vw;
    display: grid;
    grid-template-rows: auto 1fr;
`;

const MainContentContainer = styled('div')`
    min-height: 200px;
    background-color: black;
`;

type NavBarLayoutProps = {
    children?: React.ReactNode;
}

// Contains NavBar and the page contents of protected route
export const NavBarLayout = ({ children }: NavBarLayoutProps) => {
    return (
        <StyledNavBarLayout>
            <MainContentContainer>{children}</MainContentContainer>
        </StyledNavBarLayout>
    )
}