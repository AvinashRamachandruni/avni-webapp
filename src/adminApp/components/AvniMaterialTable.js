import React, { forwardRef, Fragment, useEffect, useState } from "react";
import MaterialTable from "material-table";
import TablePagination from "@material-ui/core/TablePagination";
import { useLocation, useHistory } from "react-router-dom";

const AvniMaterialTable = forwardRef(
  ({ fetchData, options, components, route, ...props }, tableRef) => {
    const [initialPage, setInitialPage] = useState(0);
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const tablePage = Number(query.get("page"));

    const history = useHistory();

    const handleFetchData = query => {
      return fetchData({ ...query, page: initialPage });
    };

    useEffect(() => {
      if (tableRef.current) {
        tableRef.current.onChangePage({}, tablePage);
      }
      setInitialPage(tablePage);
    }, [tablePage]);

    return (
      <>
        <MaterialTable
          tableRef={tableRef}
          data={typeof fetchData === "function" ? handleFetchData : fetchData}
          components={{
            Container: props => <Fragment>{props.children}</Fragment>,
            Pagination: paginationProps => {
              console.log("paginationprops", paginationProps);
              const { ActionsComponent, onChangePage, ...tablePaginationProps } = paginationProps;
              return (
                <TablePagination
                  {...tablePaginationProps}
                  onChangePage={(event, page) => {
                    history.push(`${route}?page=${page}`);
                    setInitialPage(Number(page));
                    onChangePage(event, page);
                  }}
                  ActionsComponent={subprops => <ActionsComponent {...subprops} />}
                />
              );
            },
            ...components
          }}
          options={{ ...options, initialPage }}
          {...props}
        />
      </>
    );
  }
);

export default AvniMaterialTable;
