import PlaceList from "../../components/places/PlaceList";
import postObj from "../../models/postObj";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import ErrorModal from "../../components/shared/UIElements/ErrorModal";
import { off } from "process";

// const post1: postObj = {
//   id: "p1",
//   image:
//     "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80",
//   title: "My day off!",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
//   creatorId: "u1",
//   address: "Atlantic City, NJ",
//   coordinates: { lat: 39.3651633, lng: -74.4246609 },
// };
// const post2: postObj = {
//   id: "p2",
//   image:
//     "https://images.unsplash.com/photo-1586751287766-b0d6eaee95ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//   title: "Vacay!",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
//   creatorId: "u2",
//   address: "Port Republic, NJ",
//   coordinates: { lat: 39.52071742405363, lng: -74.50259282157384 },
// };
// const Posts: postObj[] = [post1, post2];

const UserPlaces: React.FC<{ data: postObj[]; myerror: any }> = (props) => {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<postObj[]>([]);

  useEffect(() => {
    if (props.data) {
      setPosts(props.data);
    }
    setError(props.myerror);
  }, [props.data, props.myerror]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <PlaceList items={posts} />
    </React.Fragment>
  );
};
export default UserPlaces;

export async function getServerSideProps(context: any) {
  const userID = context.params.uID;
  let data = null;
  let myerror = null;
  try {
    const response = await axios({
      url: `http://localhost:5000/api/posts/user/${userID}`,
      method: "GET",
    });
    data = await response.data;
  } catch (err) {
    const error = err as AxiosError;
    myerror = error.response?.data.message;
  }

  return { props: { data, myerror } };
}
