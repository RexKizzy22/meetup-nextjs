import MeetUpDetail from "../../components/meetups/MeetUpDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetUpDetails = ({ meetUpData }) => {
  const { image, title, address, description } = meetUpData;
  return (
    <MeetUpDetail
      image={image}
      title={title}
      address={address}
      description={description}
    />
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://kizzy:Kizito%4094@cluster0.9tyrv.mongodb.net/meetupDB?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetUpCollection = db.collection("meetup");
  const result = await meetUpCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: result.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
  };
};

export const getStaticProps = async (context) => {
  const meetUpId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://kizzy:Kizito%4094@cluster0.9tyrv.mongodb.net/meetupDB?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetUpCollection = db.collection("meetup");
  const result = await meetUpCollection.findOne({ _id: ObjectId(meetUpId) });

  client.close();

  return {
    props: {
      meetUpData: {
        id: result._id.toString(),
        title: result.title,
        image: result.image,
        address: result.address,
        description: result.description,
      },
    },
  };
};

export default MeetUpDetails;
