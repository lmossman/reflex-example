import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import "./App.css"
import 'react-reflex/styles.css'

// Create a client
const queryClient = new QueryClient();

const fetchMockData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await res.json();
  return data;
}

const QueryComponent = () => {
  const { data } = useQuery('fetchMockData', fetchMockData, { suspense: true });
  console.log(data);
  return null
}

const ReflexComponent = () => {
  console.log("Rendering ReflexComponent")
  return (
    <div className="container">
    <ReflexContainer orientation="vertical">
      <ReflexElement className="left-pane"> 
        <div className="pane-content">
          <label>
            Left Pane
          </label>
        </div>
      </ReflexElement>
      <ReflexSplitter/>
      <ReflexElement className="right-pane">
        <div className="pane-content">
          <label>
            Right Pane
          </label>
        </div>
      </ReflexElement>
    </ReflexContainer>
    </div>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}> 
        <QueryComponent />
        <ReflexComponent />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;