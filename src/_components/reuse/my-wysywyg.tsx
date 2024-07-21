import Editor from 'react-simple-wysiwyg';
import useScreenSize from '../../hooks/useScreenSize';
import { useBetween } from '../../hooks/useBetween';
export const WysYWYG = ({
  html,
  setHtml,
}: {
  html: string;
  setHtml: (val: string) => void;
}) => {
  const { width } = useBetween(useScreenSize);
  const onChange = (e) => {
    setHtml(e.target.value);
  };

  return (
    <Editor
      value={html}
      onChange={onChange}
      containerProps={{
        style: {
          resize: 'vertical',
          // height: '200px',
          width: width - 40,
          border: '1px solid lightgray',
        },
      }}
    />
  );
};
