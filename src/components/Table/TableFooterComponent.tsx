import { styled } from '@mui/material';
import { ReactNode } from 'react';

const StyledFooter = styled('div')`
    display: grid;
    background-color: white;
    align-item: center;
    grid-template-columns: 1fr 0.25fr 1fr;
`;

const StyledFooterLeftContainer = styled('div')`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: start;
    align-items: center;
`;

const StyledFooterCenterContainer = styled('div')`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
`;

const StyledFooterRightContainer = styled('div')`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: end;
    align-items: center;
`;

type TableFooterComponentProps = {
    footerLeftComponent: ReactNode;
    footerCenterComponent: ReactNode;
    footerRightComponent: ReactNode;
}

export const TableFooterComponent = (props: TableFooterComponentProps) => {
    const {
        footerLeftComponent,
        footerCenterComponent,
        footerRightComponent
    } = props;

    return (
        <StyledFooter>
            <StyledFooterLeftContainer>{footerLeftComponent}</StyledFooterLeftContainer>
            <StyledFooterCenterContainer>{footerCenterComponent}</StyledFooterCenterContainer>
            <StyledFooterRightContainer>{footerRightComponent}</StyledFooterRightContainer>
        </StyledFooter>
    )
}
