import { TablePaginationInfo } from "../../hooks/useTablePagination";
import { FormControl, MenuItem, SxProps, styled } from "@mui/material";
import { MySelect } from "../Elements/Inputs/MySelect";

const StyledTableOnRowPerPage = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

const StyledMySelect = styled(MySelect)`
  color: black;
  font-size: 14px;
`;

const StyledFormControl = styled(FormControl)`
  direction: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  .MuiInputBase-root {
    fieldset {
      border: none;
      border-width: 0;
    }
  }
`;

export type MyTableOnRowPerPageProps = {
  sx?: SxProps;
} & Pick<TablePaginationInfo, 'rowsPerPage' | 'onRowsPerPageChange' | 'rowsPerPageOptions'>
export const MyTableOnRowPerPage = (props: MyTableOnRowPerPageProps) => {
  const { sx, rowsPerPage, onRowsPerPageChange, rowsPerPageOptions } = props;

  return (
    <StyledTableOnRowPerPage>
        <StyledFormControl>
          <StyledMySelect
            value={rowsPerPage}
            size="small"
            onChange={(e) => {
              onRowsPerPageChange && onRowsPerPageChange(parseInt(e.target.value as string));
            }}
          >
            {(rowsPerPageOptions || []).map((item) => (
              <MenuItem key={item} value={item} defaultValue={1} sx={{fontSize: '14px'}}>
                {item}
              </MenuItem>
            ))}
          </StyledMySelect>
        </StyledFormControl>
    </StyledTableOnRowPerPage>
  )
}
