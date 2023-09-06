
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

export const Comment = ({
  avatarSrc,
  author,
  text,
  date,
}) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={author} src={avatarSrc} />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant='body2'>{text}</Typography>}
        secondary={`${author} on ${date}`}
      />
    </ListItem>
  )
}
