import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom';
import {getData, Round} from '../../backendFunctions/functions'
// import data from '../../data.js';

const UserRP = (props) => {
	const userId = props.userId;
	const classProp = props.className;
  const [data, setData] = useState({
    name: "",
    nickname: "",
    email: "",
  });
  // console.log("index");
  // console.log(localStorage.getItem('userid'));
  
  useEffect(() => {
    let changeData = getData(`/user/id/${userId}`);
    changeData.then((json) => {
      if (json){
        setData(json);
      }
      // console.log(json);
    });
  }, []);

  return(
	<ViewProfile className={` ${classProp}`} to={`../viewuser/${userId}`}>
        {data.name}
	</ViewProfile>

);
};

const ViewProfile = styled(Link)`
`

export default UserRP;