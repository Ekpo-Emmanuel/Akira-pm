'use client'
import React, { useEffect, useState } from 'react'

interface EditableCellProps {
  getValue: () => any,
  row: any,
  column: any,
  table: any
}

export default function EditableCell(props: EditableCellProps) {
    const initialValue = props.getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
        props.table.options.meta?.updateData(
          props.row.index,
          props.column.id,
          value
        )
    }

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue]);

  return (
    <input 
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    //   className="w-full"
    />
  )
}
