import React, { ChangeEvent, Ref, forwardRef, useState } from 'react';
import clsx from 'clsx';

interface TextareaProps {
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void | null;
  value?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  secondaryLabel?: string;
  hasErrors?: boolean;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  maxCharacters?: number;
  [key: string]: unknown;
}

const Textarea: React.ForwardRefExoticComponent<TextareaProps> = forwardRef(
  (
    {
      onChange = () => {},
      value,
      className,
      label,
      placeholder,
      secondaryLabel,
      rows = 4,
      hasErrors = false,
      error,
      disabled,
      readOnly,
      maxCharacters,
      ...rest
    },
    ref: Ref<HTMLTextAreaElement>
  ) => {

    const [characterCount, setCharacterCount] = useState(value ? value.length : 0);

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = event.target.value;
      if (maxCharacters && inputValue.length > maxCharacters) {
        const truncatedInput = inputValue.slice(0, maxCharacters);
        event.target.value = truncatedInput;

        setCharacterCount(maxCharacters);

        return;
      }

      setCharacterCount(inputValue.length);

      onChange(event);
    };

    return (
      <div className={clsx('relative', className)}>
        {label && (
          <label className="text-sm mb-2 inline-block text-dark/80">
            {label}
          </label>
        )}
        {secondaryLabel && (
          <span className="text-xs mb-2 block text-dark/80">
            {secondaryLabel}
          </span>
        )}
        <div className={clsx('relative')}>
          <textarea
            className={clsx(
              'rounded px-4 py-2 text-base border border-gray-200 focus:ring-0 focus:outline-none w-full text-dark ring-0 resize-none',
              { 'border border-red-800': hasErrors },
              { 'bg-gray-25': readOnly || disabled }
            )}
            onChange={handleTextareaChange}
            placeholder={placeholder}
            value={value}
            rows={rows}
            readOnly={readOnly || disabled}
            {...rest}
          />
        </div>
        {!disabled && hasErrors && (
          <span className={clsx('mt-1 block text-sm text-red-800')}>
            {error}
          </span>
        )}
        {maxCharacters && (
          <span className={clsx('mt-1 flex justify-end text-sm text-gray-400')}>
            {characterCount}/{maxCharacters}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;