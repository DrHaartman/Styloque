import myDraftPic from "./assets/bird.jpg";

function Post() {
    return (
        <div className="grid grid-cols-2 gap-4 p-2.5 mx-2 my-4 rounded-lg">
            <div className='w-40%'>
                <img className="w-full h-full rounded" src={myDraftPic} alt="My blog's draft pic" />
            </div>
            <div className="p-2.5">
                <h2 className='text-lg font-bold m-0 leading-tight'>Perfect dormain bird</h2>
                <p className='m-2 flex gap-[5px] font-bold text-grey-100 text-sm'>
                    <a className='text-grey' href="">Noordin Ramadhan</a>
                    <time dateTime="2025-12-26T10:00:00Z">December 26th, 2025 </time>
                </p>
                <p className='text-sm m-2 leading-normal'>Grab the perfect domain—with or without a website—for an unbeatable price. The popular .com, .org, and .net extensions start at just US$13 per year. Easy to remember, easy to share, and sure to stand out.</p>
            </div>
        </div>
    );
}

export default Post;