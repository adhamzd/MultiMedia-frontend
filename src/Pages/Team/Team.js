import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Title from "../../Components/Title/Title";
import { Member } from "../../Components/Member/Member";
import "./Team.css";
import { useEffect, useState } from "react";

import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";

export default function Team(props) {
  const [membersList, setMembersList] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Did mount

    fetch(`${process.env.REACT_APP_BACK_URL}member`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        const membersList = responseJson;
        setMembersList(membersList);
        setLoad(false);
      })
      .catch((err) => setError(true));
  }, []);
  return (
    <div className="container">
      <HelmetProvider>
        <Helmet>
          <title>Multi Media | Team</title>
        </Helmet>
      </HelmetProvider>
      <Title title="TEAM" />
      {error ? (
        <Error />
      ) : load ? (
        <Loader />
      ) : (
        <div className="members-container-1">
          {membersList &&
            membersList.map((member) => {
              return (
                <Member
                  key={member._id}
                  name={member.name}
                  description={member.description}
                  image={
                    `${process.env.REACT_APP_BACK_URL}` +
                    member.image.split("/")[1]
                  }
                />
              );
            })}
          <div className="phone-footer">
            Ⓒ Copyright Multi Media. <br />
            All Rights Reserved
          </div>
        </div>
      )}
    </div>
  );
}
