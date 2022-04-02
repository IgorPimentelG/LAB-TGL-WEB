import { useState } from 'react';
import { toast } from 'react-toastify';
import { FieldError } from 'react-hook-form';

const useMonitorError = (...fields: FieldError[]) => {

    const [hasError, setHasError] = useState<boolean>(false);

    const monitorError = (): boolean => {

        setHasError(false);

        fields.forEach((item) => {
            if(item && item.type !== 'manual') {
                toast.error(item.message);
                setHasError(true);
            }
        });

        return hasError;
    }

    return { monitorError };
}

export { useMonitorError }