import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { LinkMutation } from '../../types';

interface Props {
  onSubmit: (_: LinkMutation) => Promise<void>;
}

interface Data {
  originalUrl: string;
}

interface DataError {
  originalUrl?: string;
}

const ShortenerForm: FC<Props> = ({ onSubmit }) => {
  const [data, setData] = useState<Data>({ originalUrl: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<DataError>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!data.originalUrl) {
        setError((data) => ({ ...data, originalUrl: 'Url is required.' }));

        return;
      }

      void (await onSubmit(data));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError((data) => ({ ...data, [e.target.name]: undefined }));
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack alignItems='center' gap={1}>
        <TextField
          placeholder='Enter URL here'
          name='originalUrl'
          variant='outlined'
          fullWidth
          value={data.originalUrl}
          onChange={handleChange}
          error={!!error.originalUrl}
          helperText={error.originalUrl}
        />
        <LoadingButton type='submit' variant='outlined' loading={loading} disabled={Object.values(error).some((x) => !!x)}>
          Shorten!
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default ShortenerForm;
