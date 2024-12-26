import { Box, Container, Link, Typography } from '@mui/material';
import ShortenerForm from '../../components/ShortenerForm/ShortenerForm';
import { Link as LinkType, LinkMutation } from '../../types';
import { api } from '../../api';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { baseURL } from '../../constants';

const Shortener = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [link, setLink] = useState<LinkType>();

  const handleSubmit = async (mutation: LinkMutation) => {
    try {
      const { data, status, statusText } = await api.post<LinkType>('links', mutation);

      if (status !== 200) {
        enqueueSnackbar(statusText, { variant: 'error' });
      }

      setLink(data);
    } catch (e) {
      if (e instanceof Error) {
        enqueueSnackbar(e.message, { variant: 'error' });
      }
    }
  };

  return (
    <Container>
      <Box p={2}>
        <Typography variant='h4' textAlign='center' gutterBottom>
          Shorten your link!
        </Typography>
        <ShortenerForm onSubmit={handleSubmit} />
      </Box>
      {link && (
        <Box>
          <Typography variant='h6' textAlign='center' gutterBottom>
            Your link now looks like this:
          </Typography>
          <Link component='a' href={new URL(link.shortUrl, baseURL).href} display='block' textAlign='center'>
            {new URL(link.shortUrl, baseURL).href}
          </Link>
        </Box>
      )}
    </Container>
  );
};

export default Shortener;
