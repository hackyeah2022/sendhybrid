import React, { HTMLProps } from 'react'


import {
    Column,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    Table,
    useReactTable,
} from '@tanstack/react-table'
import createColumns from "./createColumns";
import styled from "styled-components";
import Button from "../../atoms/Button/Button";
import ReactPaginate from "react-paginate";
import ArrowLeft from "../../../icons/ArrowLeft";
import Pagination from "./Pagination";
import routes from "../../../utils/routes";
import Link from "next/link";

const TableElement = styled.table`
  margin-top: 1rem;
  width: 100%;
  border-radius: 0.25rem;
  border: 2px solid ${({theme}) => theme.colors.lightGray};
  
  td {
    text-align: center;
  }
`

const ActionsWrapper = styled.div`
  display: flex;
`

const SingleActionsWrapper = styled.div`
  margin: 1rem 1rem 0.6rem 0;
  padding: calc(1rem + 2px) 0 0 0; // border
  border: 2px solid transparent;
`

const SingleActionSmallButton = styled(Button)`
  padding: 0.5rem 0.7rem;
`

const SmallButton = styled(Button)`
  padding: 0.5rem 0.7rem;
  transition: .2s all;

  &:hover {
    background: ${({theme}) => theme.colors.blue};
    color: ${({theme}) => theme.colors.white};
  }
`

const BulkActionsWrapper = styled.div`
  position: relative;
  margin: 1rem 0 0 0 ;
  border-radius: 0.25rem;
  padding: 1rem 0.4rem 0 0.4rem;
  border: 2px solid ${({theme}) => theme.colors.lightGray};
  
  ${SmallButton} {
    margin: 0 .2rem;
  }
  
  &::after {
    content: 'zaznaczone';
    position: absolute;
    top: 0;
    left: 0.3rem;
    transform: translateY(-60%);
    color: ${({theme}) => theme.colors.gray};
    background: white;
    padding: 0 .2rem;
  }
`

const SelectedRowsNoWrapper = styled.div`
  height: 1rem;
  margin: .4rem 0;
`


const ReportTable = ({data, renderSearch}) => {
    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState('')
    const columns = React.useMemo<ColumnDef<any>[]>(createColumns, [])

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    })

    const noOfRowsSelected = Object.keys(rowSelection).length

    return (
        <>
            <ActionsWrapper>
                <SingleActionsWrapper>
                    {renderSearch()}
                    <Link href={routes.SEND}>
                        <SingleActionSmallButton>Wyślij plik</SingleActionSmallButton>
                    </Link>
                </SingleActionsWrapper>
                {noOfRowsSelected > 0 && (
                    <BulkActionsWrapper>
                        <SmallButton>Wygeneruj raport zbiorczy</SmallButton>
                        <SmallButton>Usuń wybrane raporty</SmallButton>
                    </BulkActionsWrapper>
                )}
            </ActionsWrapper>
            <TableElement>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            return (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </>
                                    )}
                                </th>
                            )
                        })}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => {
                                return (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}

                </tbody>
            </TableElement>
            <Pagination />
            <SelectedRowsNoWrapper>
                {noOfRowsSelected > 0 && (
                    <div>
                        Zaznaczono {noOfRowsSelected} z{' '}
                        {table.getPreFilteredRowModel().rows.length} wierszy
                    </div>
                )}
            </SelectedRowsNoWrapper>
    </>
    )
}


export default ReportTable