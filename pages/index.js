// import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A first meetup',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/9/9b/Beach_bikepath_in_the_Venice_Beach_park%2C_California.jpg',
//     address: '123 Ocean blvd, Venice, California',
//     description: 'This is our first meetup',
//   },
//   {
//     id: 'm2',
//     title: 'A second meetup',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/5/5b/Ocean_Avenue.jpg',
//     address: '345 Ocean blvd, Santa Monica, California',
//     description: 'This is our second meetup',
//   },
// ];
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="browse a huge list of react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //fetch data from an API

//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

export async function getStaticProps() {
  //fetch data from an API

  const client = await MongoClient.connect(
    'mongodb+srv://iryna:6RwyAY296nVZqKVL@nextjsreactcourse.du60gme.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollections = db.collection('meetups');
  const meetups = await meetupsCollections.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
      // meetups: DUMMY_MEETUPS,
    },
    revalidate: 10,
  };
}

export default HomePage;
