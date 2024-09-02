import {FC, useEffect, useState} from "react";

const numInput = (val: string | number, digits: number = 6) => {
    const result = String(val);
    const arr = result.split(".");
    if (arr[1]) {
        const ar = arr[1].length ? arr[1].substring(0, Math.min(arr[1].length, digits)) : '0';
        return `${Number(arr[0])}${ isNaN(Number(ar)) ? '' : `.${ar}`}`
    }
    const a = Number(result);
    return isNaN(a) ? '0' : a.toString();
}
const InputNumber: FC<{
    value: string | number | undefined,
    onChange: (val: string) => void,
    max?: number | undefined,
    min?: number | undefined,
    step?: number,
    placeholder?: string,
    className?: string,
    onFocus?: () => void
}> = ({
                             className,
                             value= '',
                             onChange, max,
                             min,
                             step,
                             placeholder,
                             onFocus
}) => {
    const handleChange = (val: string) => {
        if (!val) {
            return '';
        }
        if (typeof min === "number") {
            val = Number(val) < min ? String(Math.max(min, 0)) : val;
        }
        if (typeof max === "number") {
            val = Number(val) > max ? String(Math.max(max, 0)) : val;
        }
        val = numInput(val, step);
        return val;
    }
    const [wdNum, setWdNum] = useState<string>('');

    useEffect(() => {
        setWdNum(handleChange(String(value)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return <input className={`${ className || '' } h-full w-full text-right bg-transparent outline-none` }
                  onInput={ (event) => {}}
                  onChange={ (event) => {
                      const res = handleChange(event.target?.value);
                      setWdNum(res);
                      onChange(res);
                  }}
                  onFocus={onFocus}
                  type="number"
                  value={ wdNum }
                  placeholder={ placeholder }/>
}

export default InputNumber;