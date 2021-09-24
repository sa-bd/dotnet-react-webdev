import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./containers/MainPage";
import "./App.css";
import PostPage from "./containers/PostPage";
import UserPosts from "./containers/UserPosts";
import SignInPage from "./containers/SignInPage";
import SignUpPage from "./containers/SignUpPage";
import CreatePostPage from "./containers/CreatePostPage";
import EditPostPage from "./containers/EditPostPage";
import PostPagePrivate from "./containers/PostPagePrivate";

function App() {
  console.log(localStorage);
  //localStorage.clear();
  if (localStorage.getItem("access_token") !== null) {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* private pages */}
            <Route exact path="/create" component={CreatePostPage} />
            <Route exact path="/edit/:id" component={EditPostPage} />
            <Route exact path="/view/:id" component={PostPagePrivate} />
            <Route exact path="/" component={UserPosts} />
            <Route exact path="*" component={UserPosts} />
          </Switch>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* public pages */}
            <Route exact path="/" component={MainPage} />
            <Route exact path="/blog/:id" component={PostPage} />
            <Route exact path="/login" component={SignInPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="*" component={MainPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
