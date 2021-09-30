import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "./services/httpService";
import config from "./config.json";
import { toast } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";


class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    // read >>   get
    // insert >>  post
    // update  >>  put (whole object) / patch (some columns)
    // delete >> delete

    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";

    await http.put(config.apiEndpoint + "/" + post.id, post);
    
    // http.patch(config.apiEndpoint + '/'+ post.id, { title: post.title });

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    //ui  update >> already delete post on UI //
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete('s '+ config.apiEndpoint + "/" + post.id);
      // nothing to do //
    } catch (ex) {
      // 400  to 500 //

      // //404 / not found //
      // if (ex.response && ex.response.status === 404)
      //   toast.error ("This post has already been deleted.");
      // else if (ex.response && ex.response.status === 400) {
      //   toast("not found route");
      // } 
      //restore UI original state //
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer/>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
