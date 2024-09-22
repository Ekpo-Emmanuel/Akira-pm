import '@tanstack/react-table'

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: any) => void
  }
}