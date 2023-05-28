


import { TextField } from '@mui/material'
import React from 'react'

export default function OutlineInputCustom({className, fs, line, color="primary", label}) {
  return (
    <div className={className}>
      <TextField
                     sx={{
                        marginTop: '1rem',
                        input: {
                           fontSize: fs,
                        },
                        label: {
                           fontSize: fs,
                        },
                        ".MuiOutlinedInput-notchedOutline legend": {
                           fontSize: line,
                        },
                     }}
                     id="outlined-basic"
                     label={label}
                     variant="outlined"
                     color={color}
                  />
    </div>
  )
}
