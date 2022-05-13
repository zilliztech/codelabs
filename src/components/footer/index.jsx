import {
  LINK_JSON,
  SOCIAL_JSON
} from './constant';
import { Typography, Box, Link, Stack } from '@mui/material';
import './index.less';

export default function Header() {
  const fullYear = new Date().getFullYear();

  const ColumnTemp = ({ title, list }) => {
    return (
      <Box>
        <Typography component="p" className='link-title'>{title}</Typography>
        <Box className='links-wrapper'>
          {
            list.map(v => <Link href={v.to} target="_blank" key={v.to} underline="none">{v.name}</Link>)
          }
        </Box>

      </Box>
    );
  };

  return (
    <footer className='footer-container'>
      <Box className='link-section'>
        {
          LINK_JSON.map(v => (
            <ColumnTemp title={v.title} list={v.children} />
          ))
        }
      </Box>
      <Box className='social-media-section'>
        <Typography component="p">Milvus. {fullYear} All rights reserved.</Typography>
        <Box className="media-wrapper">
          {
            SOCIAL_JSON.map(v => (
              <Link href={v.link} target="_blank" underline='none'>
                <img src={v.icon} alt={v.alt} />
              </Link>
            ))
          }
        </Box>
      </Box>
    </footer>
  );
}
