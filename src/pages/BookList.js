// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Alert,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton
// } from '@mui/material';
// import { Add as AddIcon, Book as BookIcon } from '@mui/icons-material';

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [error, setError] = useState('');
//   const { logout } = useAuth();

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       setFetching(true);
//       const response = await axios.get('/api/books');
//       setBooks(response.data);
//     } catch (error) {
//       if (error.response?.status === 401) {
//         logout();
//       } else {
//         setError('Failed to fetch books');
//       }
//     } finally {
//       setFetching(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!title || !author) {
//       return setError('Please fill in all fields');
//     }
    
//     try {
//       setLoading(true);
//       setError('');
//       await axios.post('/api/books', { title, author });
//       setTitle('');
//       setAuthor('');
//       fetchBooks(); // Refresh the list
//     } catch (error) {
//       setError('Failed to add book');
//     }
    
//     setLoading(false);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ 
//         mb: 4, 
//         color: 'primary.main',
//         fontWeight: 'bold'
//       }}>
//         My Book Collection
//       </Typography>
      
//       <Grid container spacing={4}>
//         {/* Add Book Form */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ 
//             animation: 'slideIn 0.5s ease-out',
//             height: '100%'
//           }}>
//             <CardContent>
//               <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
//                 Add New Book
//               </Typography>
              
//               {error && (
//                 <Alert severity="error" sx={{ mb: 2 }}>
//                   {error}
//                 </Alert>
//               )}
              
//               <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="title"
//                   label="Book Title"
//                   name="title"
//                   autoComplete="off"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   sx={{ mb: 2 }}
//                 />
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   name="author"
//                   label="Author"
//                   type="text"
//                   id="author"
//                   autoComplete="off"
//                   value={author}
//                   onChange={(e) => setAuthor(e.target.value)}
//                   sx={{ mb: 3 }}
//                 />
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   disabled={loading}
//                   size="large"
//                   startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
//                   sx={{
//                     py: 1.5,
//                     fontSize: '1.1rem',
//                     background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
//                     '&:hover': {
//                       transform: 'translateY(-1px)',
//                       boxShadow: 3
//                     },
//                     transition: 'all 0.2s ease-in-out'
//                   }}
//                 >
//                   {loading ? 'Adding...' : 'Add Book'}
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Book List */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ 
//             animation: 'slideIn 0.5s ease-out',
//             animationDelay: '0.1s',
//             height: '100%'
//           }}>
//             <CardContent>
//               <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
//                 Your Books
//               </Typography>
              
//               {fetching ? (
//                 <Box display="flex" justifyContent="center" alignItems="center" py={4}>
//                   <CircularProgress />
//                 </Box>
//               ) : books.length === 0 ? (
//                 <Box textAlign="center" py={4}>
//                   <BookIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
//                   <Typography variant="body1" color="text.secondary">
//                     No books added yet. Start by adding your first book!
//                   </Typography>
//                 </Box>
//               ) : (
//                 <List>
//                   {books.map((book, index) => (
//                     <ListItem 
//                       key={book._id}
//                       sx={{ 
//                         animation: `fadeIn 0.3s ease-out ${index * 0.05}s`,
//                         borderBottom: '1px solid',
//                         borderColor: 'divider',
//                         '&:last-child': { borderBottom: 'none' }
//                       }}
//                     >
//                       <ListItemText
//                         primary={book.title}
//                         secondary={`by ${book.author}`}
//                         primaryTypographyProps={{ fontWeight: 'medium' }}
//                       />
//                     </ListItem>
//                   ))}
//                 </List>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default BookList;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Avatar
} from '@mui/material';
import { 
  Add as AddIcon, 
  Book as BookIcon, 
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [liking, setLiking] = useState(false);
  const { logout, currentUser } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setFetching(true);
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
      } else {
        setError('Failed to fetch books');
      }
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !author) {
      return setError('Please fill in all fields');
    }
    
    try {
      setLoading(true);
      setError('');
      await axios.post('/api/books', { title, author });
      setTitle('');
      setAuthor('');
      fetchBooks(); // Refresh the list
    } catch (error) {
      setError('Failed to add book');
    }
    
    setLoading(false);
  };

  const handleLike = async (bookId) => {
    try {
      setLiking(true);
      // First, check if the book already has likes array
      const bookToUpdate = books.find(book => book._id === bookId);
      const currentLikes = bookToUpdate.likes || [];
      
      // Check if current user already liked this book
      const userLikedIndex = currentLikes.findIndex(like => like.userId === currentUser.id);
      
      let updatedLikes;
      if (userLikedIndex > -1) {
        // Unlike - remove user's like
        updatedLikes = currentLikes.filter(like => like.userId !== currentUser.id);
      } else {
        // Like - add user's like
        updatedLikes = [...currentLikes, { 
          userId: currentUser.id, 
          timestamp: new Date().toISOString() 
        }];
      }
      
      // Update the book with new likes array
      const response = await axios.patch(`/api/books/${bookId}`, {
        likes: updatedLikes
      });
      
      // Update local state
      setBooks(prevBooks => 
        prevBooks.map(book => 
          book._id === bookId ? { ...book, likes: updatedLikes } : book
        )
      );
    } catch (error) {
      console.error('Error updating like:', error);
      setError('Failed to update like');
    } finally {
      setLiking(false);
    }
  };

  const isBookLikedByUser = (book) => {
    return book.likes && book.likes.some(like => like.userId === currentUser.id);
  };

  const getLikeCount = (book) => {
    return book.likes ? book.likes.length : 0;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ 
        mb: 4, 
        color: 'primary.main',
        fontWeight: 'bold'
      }}>
        My Book Collection
      </Typography>
      
      <Grid container spacing={4}>
        {/* Add Book Form */}
        <Grid item xs={12} md={5}>
          <Card sx={{ 
            animation: 'slideIn 0.5s ease-out',
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
                Add New Book
              </Typography>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Book Title"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="author"
                  label="Author"
                  type="text"
                  id="author"
                  autoComplete="off"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: 3
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  {loading ? 'Adding...' : 'Add Book'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Book List */}
        <Grid item xs={12} md={7}>
          <Card sx={{ 
            animation: 'slideIn 0.5s ease-out',
            animationDelay: '0.1s',
            height: '100%',
            maxHeight: '600px',
            overflow: 'auto'
          }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
                Your Books ({books.length})
              </Typography>
              
              {fetching ? (
                <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                  <CircularProgress />
                </Box>
              ) : books.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <BookIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    No books added yet. Start by adding your first book!
                  </Typography>
                </Box>
              ) : (
                <List>
                  {books.map((book, index) => (
                    <ListItem 
                      key={book._id}
                      sx={{ 
                        animation: `fadeIn 0.3s ease-out ${index * 0.05}s`,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '&:last-child': { borderBottom: 'none' },
                        '&:hover': {
                          backgroundColor: 'action.hover',
                          transition: 'background-color 0.2s ease-in-out'
                        }
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6" component="span" fontWeight="medium">
                              {book.title}
                            </Typography>
                            <Chip
                              size="small"
                              avatar={
                                <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24 }}>
                                  <FavoriteIcon sx={{ fontSize: 14 }} />
                                </Avatar>
                              }
                              label={getLikeCount(book)}
                              variant="outlined"
                              sx={{ 
                                borderColor: 'primary.main',
                                color: 'primary.main'
                              }}
                            />
                          </Box>
                        }
                        secondary={`by ${book.author}`}
                        sx={{ mr: 2 }}
                      />
                      <IconButton
                        onClick={() => handleLike(book._id)}
                        disabled={liking}
                        sx={{
                          color: isBookLikedByUser(book) ? 'error.main' : 'action.active',
                          '&:hover': {
                            color: 'error.main',
                            transform: 'scale(1.1)',
                            transition: 'all 0.2s ease-in-out'
                          }
                        }}
                      >
                        {isBookLikedByUser(book) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookList;