import StreamsItem from "../../Container/Home/StreamItem";
import { StreamsData } from "../../Data/StreamsData";

const Streams = () => {
  return (
    <div className="lg:w-[1300px] my-4 px-2 flex flex-col mx-auto mt-20">
      <div className="text-left w-full max-w-screen-lg mb-4">
        <div>
          <h1 className="text-3xl font-semibold m-2">Explore your Future</h1>
          <span className="text-lg font-light">Select for College</span>
        </div>
        <hr className="lg:w-[1300px]" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {StreamsData.map((item, index) => (
          <StreamsItem data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Streams;
