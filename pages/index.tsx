import type { NextPage } from "next";
import { prismaClient } from "src";

export async function getServerSideProps() {
  const blogs = await prismaClient.blog.findMany({
    where: {
      published: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return { props: { blogs: JSON.stringify(blogs) } };
}

const Home: NextPage = ({ blogs }) => {
  console.log(blogs && JSON.parse(blogs));

  return (
    <div>
      <p>hey</p>
    </div>
  );
};

export default Home;
