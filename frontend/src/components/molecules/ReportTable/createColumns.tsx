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
        accessorKey: 'caseNumber',
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
    cell: ({getValue}) => new Date(getValue()).toLocaleString(),
    footer: props => props.column.id,
},
    {
        header: 'Status weryfikacji',
        accessorKey: 'validationGeneralFailed',
        cell: ({getValue}) => <div><CustomStatusIcon isOk={!getValue()} />{getValue()}</div>,
        footer: props => props.column.id,
    },
{
    header: 'Wysłano',
        accessorKey: 'sent',
    cell: ({getValue}) => <CustomStatusIcon isOk={getValue()} />,
    footer: props => props.column.id,
},
{
    header: 'Zobacz raport',
    accessorKey: 'id',
    cell: ({getValue}) => (
        <Link href={`/report/${getValue()}`}>
            <a>
                <GoToReportButton>Zobacz raport</GoToReportButton>
            </a>
        </Link>
    ),
    footer: props => props.column.id,
},
]

export default createColumns
