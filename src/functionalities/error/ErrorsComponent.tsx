import { useEffect, useState } from 'react';
import PubSub from '../../_utils/PubSub';
import { utils } from '../../_utils/utils';

const ErrorsComponent = () => {
  const [errors, setErrors] = useState<any[]>([]);

  useEffect(() => {
    PubSub.subscribe('onError', (data) => {
      console.log(data);
      const newErrors = [...errors, data];
      setErrors(newErrors);
    });
  }, [errors]);

  if (!errors.length) {
    return null;
  }

  return (
    <div className="">
      {errors.map((error) => (
        <div className="error" key={utils.createUUID()}>
          {error}
        </div>
      ))}
    </div>
  );
};

export default ErrorsComponent;
