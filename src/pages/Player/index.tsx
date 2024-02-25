import Layout from "../../components/Layout";

const Player = () => {
  return (
    <Layout>
      <p>Hello World</p>
      <audio controls>
        <source src="spotify:track:70EfY0H5VfN7WiwXEc2yW4" />
      </audio>
    </Layout>
  );
};

export default Player;
