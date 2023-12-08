import { TreeItemProps, TreeItem } from '@mui/x-tree-view';
import { styled } from '@mui/material';

const StyledTreeItem = styled(TreeItem)`
    & > .MuiTreeItem-content {
        height: 25px;
    }
`;

export function MyTreeItem(props: TreeItemProps) {
    return (
        <StyledTreeItem {...props}>
            {props.children}
        </StyledTreeItem>
    )
}