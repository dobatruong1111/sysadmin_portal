import { MyTablePagination, MyTablePaginationProps } from "./MyTablePagination";

type MyTablePaginationWrapperProps = {

} & MyTablePaginationProps;

export const MyTablePaginationWrapper = (props: MyTablePaginationWrapperProps) => {
    const { showPaginationInfo, ...rest } = props;
    return (
        <MyTablePagination 
            showPaginationInfo={showPaginationInfo}
            {...rest}
        />
    )
}
