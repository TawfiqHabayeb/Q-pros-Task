export default function profilePage({params}:any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen m-2 ">
                <h1 className="text-2xl m-3"> profile Page</h1> 
            <hr/>
            <h1 className="m-2"> profile</h1>
            <span className="  p-2  rounded text-black bg-blue-500 m-4"> {params.id} </span>
            
        </div>
    )
}