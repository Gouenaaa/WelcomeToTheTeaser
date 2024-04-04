import React from 'react'

export default function GenderSelectOptions(order) {
    let options = {}; 
    if(order.order === 0){
        options = 
        {
            0: "Male",
            1: "Female",
            2: "Other"
        }
    }else if(order.order === 1){
        options = 
        {
            1: "Female",
            0: "Male",
            2: "Other"
        }

    }else if(order.order === 2){
        options = 
        {
            2: "Other",
            0:"Male",
            1: "Female",
        }
    }
    const keys = Object.keys(options)
    const values = Object.values(options)

    return (
        <>
            {
                keys.map((key, index) => 
                    {
                       return <option key={key} value={key}>{`${values[index]}`}</option>
                    }                    
                )
            }
        </>
    )
}
