import { Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from "@mui/material"

export const ChatList = ({ entities, loading }) => {
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
        loading && [ ...Array(6) ].map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width={'90%'}
            height='100px'
            sx={{ marginY: 1, bgcolor: '#698169' }}
          />
        ))
      }
      {
        entities.map((entity, index) => (
          <ListItem
            key={index}
            sx={{
              width: '90%',
              bgcolor: '#718f71',
              borderRadius: 2,
              display: loading ? 'none' : 'flex',
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