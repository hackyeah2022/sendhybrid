import React from "react";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import Button from "../../atoms/Button/Button";
import styled from "styled-components";
import StatusIcon from "../../atoms/StatusIcon/StatusIcon";
import Link from "next/link";

const CustomStatusIcon = styled(StatusIcon)`
  width: 2rem;
`

const GoToReportButton = styled(Button)`
  background: ${({theme}) => theme.colors.lightBlue};
  color: ${({theme}) => theme.colors.white};
  padding: 0.2rem 0.4rem;
  &:hover {
    background: ${({theme}) => theme.colors.blue};
    border-color: background: ${({theme}) => theme.colors.blue};
  }
`

const createColumns = () => [
    {
        id: 'select',
        header: ({ table }) => (
            <IndeterminateCheckbox
                {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
    />
),
cell: ({ row }) => (
    <div className="px-1">
        <IndeterminateCheckbox
            {...{
                    checked: row.getIsSelected(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
/>
</div>
),
},
{
    header: 'Nr sprawy',
        accessorKey: 'id',
    footer: props => props.column.id,
},
{
    header: 'Nazwa',
        accessorKey: 'name',
    footer: props => props.column.id,
},
{
    header: 'Data weryfikacji',
        accessorKey: 'date',
    footer: props => props.column.id,
},
{
    header: 'Status weryfikacji',
        accessorKey: 'status',
    cell: () =><CustomStatusIcon isOk={false} />,
    footer: props => props.column.id,
},
{
    header: 'Zobacz raport',

    cell: ({row: {getValue}}) => (
        <Link href={`/report/${getValue('id')}`}>
            <a>
                <GoToReportButton>Zobacz raport</GoToReportButton>
            </a>
        </Link>
    ),

    footer: props => props.column.id,
},
]

export default createColumns
