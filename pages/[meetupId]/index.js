import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
const MeetupDetails = (props) => {
  return (
    <MeetupDetail
      title={props.meetupData.title}
      image={props.meetupData.image}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://iryna:6RwyAY296nVZqKVL@nextjsreactcourse.du60gme.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollections = db.collection('meetups');
  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    // fallback: false,
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  //fetch data for single meetup
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    'mongodb+srv://iryna:6RwyAY296nVZqKVL@nextjsreactcourse.du60gme.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollections = db.collection('meetups');
  const selectedMeetup = await meetupsCollections.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetails;
