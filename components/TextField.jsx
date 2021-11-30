import { styled } from '@stitches/react';

const TextField = styled('input', {
  fontSize: '1.2rem',
  borderColor: 'var(--primary-color)',
  borderWidth: '2px',
  padding: '0.5rem 0.75rem',
  '&:focus': {
    outline: '2px solid var(--secondary-color)',
  },
});

export default TextField;
