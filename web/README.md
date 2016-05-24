-App
  - Home *(TBD: Controlled by route)*
    - EventInfo **(Controlled by route)**
    - Stream
      - Navigation
      - LiveFeed **(Controlled by route)**
        - Post
      - ArchiveFeed **(Controlled by route)**
        - Post
  - About [?] *(TBD: Controlled by route)*


## Stateless components
Write the presentational components that lack state as simpler, functional components:
https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components

## Store data shape

###Now

```
{
  selectedEvent: 'halloween15',
  isLive: false,
  isFetching: false,
  lastUpdated: 1439478405547,
  eventInfo: {}
  fetchedPostCount: 2,
  posts: [      
    {
      id: 42,
      title: 'Confusion about Flux and Relay'
    },
    {
      id: 500,
      title: 'Creating a Simple Application Using React JS and Flux Architecture'
    }
  ]
}
```

###Future

```
{
  selectedEvent: 'halloween15',
  isLive: false,
  postsByEvent: {
    halloween15: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    2015: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      fetchedPageCount: 2,
      items: [
        {
          id: 42,
          title: 'Confusion about Flux and Relay'
        },
        {
          id: 500,
          title: 'Creating a Simple Application Using React JS and Flux Architecture'
        }
      ]
    }
  }
}
```
