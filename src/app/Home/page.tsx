import CreateTask from "./Component/CreateTask";
import Body from "./Component/Body";
export default async function ProtectedPage() {
  return (
    <>
      <div className="shadow-xs  shadow-blue-500 md:grid md:p-1 flex flex-col gap-2 p-5 w-full h-full grid-cols-4">
        <div className="col-span-2 items-center flex justify-center w-full p-2">
          <CreateTask />
        </div>
        <div className="col-span-2 shadow-xs shadow-blue-500 h-[calc(100vh-10rem)] md:h-full overflow-auto">
          <Body/>
        </div>
      </div>
    </>
  );
}
