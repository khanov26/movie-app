import {ChangeEvent, useState} from "react";

export default function useInput(defaultValue: string | (() => string)) {
    const [value, setValue] = useState(defaultValue);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue('');
    };

    return {
        value,
        onChange,
        reset,
    }
}
