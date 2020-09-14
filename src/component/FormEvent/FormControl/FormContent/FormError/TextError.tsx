import React from 'react'

interface Props {
    children: string,
    name: string
}

export default function TextError(props: Props) {
   const {children, name} = props
    return (
        <div className="error"  data-testid={`${name}Error`} style={{color: 'red', fontSize:'12px'}}>
            {children}
        </div>
    )
}


