import { Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"

export const ChatList = ({ entities }) => {
  return (
    <List sx={{
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 8,
    }}>
      {
        entities.map((entity, index) => (
          <ListItem
            key={index}
            sx={{
              width: '90%',
              bgcolor: '#718f71',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'row',
              padding: 1.5,
              marginY: 1,
              cursor: 'pointer',
              '&:hover': { bgcolor: '#81bb81' },
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{ height: '60px', width: '60px', marginX: 2 }}
                alt={entity.name}
                src={entity.avatar}
              />
            </ListItemAvatar>
            <ListItemText
              sx={{ paddingX: 0 }}
              primary={<Typography variant='body1'>{entity.name}</Typography>}
              secondary={entity.bio}
            />
          </ListItem>
        ))
      }

    </List>
  )
}