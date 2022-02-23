// This contains the data for each step in the scrolly story. 

let defaultViewState = {
    longitude: -74.6,
    latitude: 40.7,
    zoom: 10,
    maxZoom: 16,
    pitch: 0,
    bearing: 0,
    maxBounds: [
        [-74.8, 40], // Southwest coordinates
        [-73.2, 41] // Northeast coordinates
    ]
}

let steps = [
  {
    id: 0,
    text: {
      header: "This is New York City.",
    },
    mapState:{
        viewState: defaultViewState,
        overLayState: {
            dotsVisible: false,
            floodVisible: false,
        }
    },
  },
  {
    id: 1,
    text: {
      header: "And this is all of us.",
      body: "Based on the 2019 ACS Cenus Data about where we all live",
    },
    mapState:{
        viewState: {...defaultViewState, zoom: 12, latitude: 40.65899253534682, longitude: -73.99568511962869},
        overLayState: {
            dotsVisible: true,
            floodVisible: false,
        }
    }
  },
  {
    id: 2,
    text: {
      header: "New York might not always look like this...",
    },
    mapState:{
        viewState: defaultViewState,
        overLayState: {
            dotsVisible: true,
            floodVisible: false
        }
    },
  },
  {
    id: 3,
    text: {
      header: "In the future it might look like this...",
      body: "This is the FEMA 2020s projected 500-year flood map. A flood like this is expected to happen with a probability of 0.2% every year."
    },
    mapState:{
        viewState: defaultViewState,
        overLayState: {
            dotsVisible: true,
            floodVisible: true
        }
    }
}
];

export default steps;