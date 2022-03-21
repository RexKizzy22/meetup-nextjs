import styles from "../styles/Home.module.css";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const Home = (props) => {
  return <div className={styles.container}>
      <MeetupList meetups={props.meetUps} />
  </div>;
};


export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://kizzy:Kizito%4094@cluster0.9tyrv.mongodb.net/meetupDB?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetUpCollection = db.collection("meetup");
  const meetups = await meetUpCollection.find().toArray();

  client.close();

  return {
    props: {
      meetUps: meetups.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  };
};

export default Home;
