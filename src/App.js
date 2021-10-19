import React, { useState, useEffect } from 'react';
import Datetime from './Date';
import { Container, Box, Typography, TextField, Button, Link, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  gridContainer: {
    paddingTop: '24px',
    paddingBottom: '24px'
  },
  gridItem: {
    backgroundColor: '#fff',
    height: '100%'
  },
  gridInfo: {
    padding: '0 16px 16px 16px'
  },
  gridLink: {
    padding: '16px',
    display: 'block'
  }
}))

const App = () => {
  const classes = useStyles();
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react')
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=react')
  const [loading, setLoading] = useState(false)

  const fetchNews = () => {
    setLoading(true)
    fetch(url)
      .then(result => result.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error))
  }

  // fetch news when url changes after clicking submit
  useEffect(() => {
    fetchNews()
  }, [url])

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // change fetched url when clicking submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  const showNews = () => {
    return (
      news.map((n, i) => (
        <>
          <Grid item xs={6} md={3} key={i}>
            <Box className={classes.gridItem}>
              <Link className={classes.gridLink} variant="body1" href={n.url} target="_blank" rel="noreferrer">{n.title}</Link>
              <Typography className={classes.gridInfo}><Datetime date={n.created_at} /> - by {n.author}</Typography>
            </Box>
          </Grid>
        </>
      ))
    )
  }

  const loadNews = () => {
    return (
      loading ? <Typography variant="h2">Loading</Typography> : showNews()
    )
  }

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <TextField value={searchQuery} onChange={handleChange} />
      <Button variant="outlined" type="submit">Search</Button>
    </form>
  )

  return (
    <Container>
      <Box>
        <Typography variant="h2">News</Typography>
        {searchForm()}
        <Grid className={classes.gridContainer} container spacing={2}>
          {loadNews()}
        </Grid>
      </Box>
    </Container>
  )
}

export default App;
