import React from 'react';

const CheckboxGroup = ({ groupName, checkboxes, checkboxState, onChange }) => {
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        onChange(name, checked);
    };

    return (
        <div className='view-contents'>
        <h1>{groupName}</h1>
        <div className='view-contents-checkbox'>
            {checkboxes.map(checkbox => (
                <div className='view-contents-check' key={checkbox.name}>
                    <input 
                        type='checkbox' 
                        name={checkbox.name} 
                        checked={checkboxState[checkbox.name]} 
                        onChange={handleCheckboxChange} 
                    />
                    <p className={checkboxState[checkbox.name] ? 'checked' : ''}>{checkbox.label}</p>
                </div>
            ))}
        </div>
    </div>
    );
};

export default CheckboxGroup;
