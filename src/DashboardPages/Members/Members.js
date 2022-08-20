import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import MembersForm from "../../Components/Members-Form/Members-Form";
import "./Members.css";
import Dashmember from "../../Components/Dashmember/Dashmember";
import SideNav from "../../Components/DashboardNav/SideNav";
import Carousel from "../../Components/Carousel/Carousel";
import Title from "../../Components/Title/Title";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";

export default function Members() {
  const [membersList, setMembersList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);

  const fetchMembers = async () => {
    try {
      setLoad(true);
      const data = await fetch(`${process.env.REACT_APP_BACK_URL}member `);
      const resJson = await data.json();
      setMembersList(resJson);
      setLoad(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [refresh]);

  return (
    <div className="dashMember-background-container">
      <HelmetProvider>
        <Helmet>
          <title>Dashboard | Team</title>
        </Helmet>
      </HelmetProvider>
      <SideNav />
      {error ? (
        <Error />
      ) : load ? (
        <Loader />
      ) : (
        <div className="right-side-container">
          <Title title="MEMBERS DASHBOARD" />
          <div className="current-members-container">
            <p className="current-p">CURRENT MEMBERS</p>
            <div className="carousal-container1">
              <Carousel show={3}>
                {membersList &&
                  membersList.map((member) => {
                    return (
                      <Dashmember
                        id={member._id}
                        description={member.description}
                        key={member._id}
                        name={member.name}
                        image={
                          ` ${process.env.REACT_APP_BACK_URL}` +
                          member.image.split("/")[1]
                        }
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />
                    );
                  })}
              </Carousel>
            </div>
            <div className="carousal-container2">
              <Carousel show={2}>
                {membersList &&
                  membersList.map((member) => {
                    return (
                      <Dashmember
                        id={member._id}
                        description={member.description}
                        key={member._id}
                        name={member.name}
                        image={
                          ` ${process.env.REACT_APP_BACK_URL}` +
                          member.image.split("/")[1]
                        }
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />
                    );
                  })}
              </Carousel>
            </div>
            <div className="carousal-container3">
              <Carousel show={1}>
                {membersList &&
                  membersList.map((member) => {
                    return (
                      <Dashmember
                        id={member._id}
                        description={member.description}
                        key={member._id}
                        name={member.name}
                        image={
                          ` ${process.env.REACT_APP_BACK_URL}` +
                          member.image.split("/")[1]
                        }
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />
                    );
                  })}
              </Carousel>
            </div>
          </div>

          <div className="members-form-container">
            <p className="add-p"> ADD NEW MEMBER</p>
            <MembersForm refresh={refresh} setRefresh={setRefresh} />
          </div>
        </div>
      )}
    </div>
  );
}
