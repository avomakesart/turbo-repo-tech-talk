import React, { HTMLInputTypeAttribute } from 'react';
import { classNames } from '../../utils';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  isInvalid?: boolean;
  errorMessage?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { label, className, id, isInvalid, errorMessage, ...rest } = props;
    return (
      <>
        <label
          htmlFor={label ? label?.toLowerCase() : id}
          className={classNames(
            'block text-sm font-semibold leading-6 text-gray-900',
            String(!label) && 'sr-only'
          )}
        >
          {label ? label : id}
        </label>
        <input
          ref={ref}
          className={classNames(
            `mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm ${
              isInvalid &&
              'border border-red-600 ring-1 ring-red-500 focus:ring-1 focus:border-sky-500 focus:ring-sky-500'
            } sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200`,
            String(className) && String(className)
          )}
          data-invalid={isInvalid}
          {...rest}
        />
        {isInvalid && (
          <div className='flex items-center text-red-500 mt-2 text-sm leading-normal'>
            {errorMessage}
          </div>
        )}
      </>
    );
  }
);

Input.displayName = 'Input';
