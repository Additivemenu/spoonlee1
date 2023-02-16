import './App.css';


import TrendingNews from './components/TrendingNews';
import PopularReviews from './components/PopularReviews';

import {useState} from 'react';

// mock data revceived from backend
const mockReviewItem = {coverURL: "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEczyEMDd2BLa3dtkGJVE9Id.png",title: "review", author: "tom", createTime: "1 day ago"};
const mockNewsItem = {coverURL: "https://assets.xboxservices.com/assets/e5/4d/e54d4a36-75a4-481d-936d-47956fc448b9.jpg?n=Hogwarts-Legacy_GLP-Page-Hero-1084_1920x1080.jpg",title: "news", author: "alice", createTime: "2 day ago"};

const initialState = {
  popularReviews:[],
  trendingNews: []
};

for(let i=1; i<=6;i++){
  initialState.trendingNews.push(structuredClone(mockReviewItem));
}

for(let i=1; i<=8;i++){
  initialState.popularReviews.push(structuredClone(mockNewsItem));
}

console.log (initialState);
// -------------------------------------------------------------------

function App() {

  //
  const [state, setState] = useState(initialState);

  return (
    <div>
        <TrendingNews newsList = {state.trendingNews} />
        <PopularReviews reviewsList = {state.popularReviews} />

    </div>
  );
}

export default App;
