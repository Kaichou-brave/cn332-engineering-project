import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import React, { useContext, useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getFeature, postFeature } from "../../utils/sdk";
import { Comment } from "../../components";

import {
  Navbar,
  Nav,
  NavDropdown,
  Col,
  Row,
  Image,
  Button,
  Tabs,
  Container,
} from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";



const getPost = () => getFeature("posts/");

const post_POST = (data) => postFeature("create_post/", data);
const getComment = () => getFeature("comments/<int:pk>/");

const Dashboard = () => {

  let history = useHistory();

  const [samplePost, setSamplePost] = useState([])
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    console.log("call useEff")
    getPost().then((resp) => {
      setSamplePost(resp.data);


    });
  }, []);


  /* let i = 0;
  while ( i < samplePost.length) {
    console.log("i  = " + i)
    console.log( "this is post" + samplePost[i].title);
    i++;
    
  } */

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(inputs.description);
    setInputs((values) => ({ ...values, [name]: value }));
    console.log("after change" + inputs.description);
  };


  const handleCreatePost = (event) => {
    event.preventDefault();
    const data = {
      title: inputs.title,
      body: inputs.description,

    };
    console.log(data);
    post_POST(data).then(() => {
      getPost().then((resp) => {
        setSamplePost(resp.data);

      });
    });


  };
  console.log("print")






  return (
    <body style={{ backgroundColor: "#edf1f5", }}>
      <Container className='justify-content-md-center' style={{ paddingTop: "20px", }}>
        <ListGroup as="ol" numbered>
          {samplePost.map((post, index) =>
          (
            <Col>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start justify-content-end"
                key={index}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{post.title}</div>
                  <label>{post.body}</label><br></br>
                  <label>{post.owner}</label><br></br>
                  <label>this is id {post.id}</label>
                  <label>this is comments {post.comments}</label>
                  <div class="text-align-center">this is avatar{post.options.map((post_1, index) => (<Col>
                    <img src={post_1.avatar} width="100px"></img>

                  </Col>))}</div>
                  <Badge bg="primary" pill>
                    no comment xDsssssssss
                  </Badge>
                  <Comment comments={post.comments} />
                </div>




              </ListGroup.Item>

            </Col>
          ))
          }
        </ListGroup>

        <form onSubmit={handleCreatePost}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={inputs.title || ""}
              onChange={handleChange}
            />
          </label>

          <br></br>

          <label>
            Description:
            <input
              type="text"
              name="description"
              value={inputs.description || ""}
              onChange={handleChange}
            />
          </label>

          <input type="submit" />
        </form>
      </Container>
    </body>
  );
}


export default Dashboard;
